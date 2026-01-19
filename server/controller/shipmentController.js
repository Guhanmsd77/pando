const shipmentValidator = require("../validator/shipmentValidator");
const shipmentService = require("../lib/shipmentService");
const fs = require('fs');
const csv = require('csv-parser');

class shipmentController {
    static async createShipment(req, res) {
        try {
            const shipmentData = req.body;
            const validation = shipmentValidator.validate(shipmentData);
            if(validation.error) {
                return res.status(400).json({ error: validation.error.details[0].message });
            }
            const newShipment = await shipmentService.postShipmentService(shipmentData);
            res.status(201).json({ message: "Shipment created successfully", newShipment });
        }catch(err) {
            res.status(500).json({ error: "An error occurred while creating shipment" });
        }
    }
    static async getAllShipments(req, res) {
        try {
            const allShipmentData = await shipmentService.getShipmentService();
            res.status(200).json({ message: "Shipments fetched successfully", allShipmentData });
        }catch(err) {
            res.status(500).json({ error: "An error occurred while fetching shipments" });
        }
    }

    static async uploadCsv(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const results = [];
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        const shipments = results.map(row => ({
                            source: row.source,
                            destination: row.destination,
                            vehicleType: row.vehicleType,
                            materialType: row.materialType,
                            materials: row.materials ? row.materials.split(';').map(m => m.trim()) : [],
                            totalWeightInKg: Number(row.totalWeightInKg),
                            totalVolume: Number(row.totalVolume),
                            groupId: row.groupId
                        }));

                        const createdShipments = await shipmentService.bulkCreateShipments(shipments);
                        
                        fs.unlinkSync(req.file.path);

                        res.status(201).json({ 
                            message: `${createdShipments.length} shipments created from CSV`, 
                            shipments: createdShipments 
                        });
                    } catch(err) {
                        fs.unlinkSync(req.file.path);
                        res.status(500).json({ error: "Error processing CSV data: " + err.message });
                    }
                })
                .on('error', (err) => {
                    fs.unlinkSync(req.file.path);
                    res.status(500).json({ error: "Error reading CSV file: " + err.message });
                });
        } catch(err) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ error: "An error occurred while uploading CSV: " + err.message });
        }
    }

    static async getGroupDetails(req, res) {
        try {
            const { groupId } = req.params;
            const shipments = await shipmentService.getShipmentsByGroupId(groupId);
            
            if (shipments.length === 0) {
                return res.status(404).json({ error: "No shipments found for this group" });
            }

            const multiTripInfo = await shipmentService.getMultiTripTypeByGroupId(groupId);
            const sourceDestInfo = await shipmentService.getSourceDestinationByGroupId(groupId);

            const summary = {
                groupId,
                shipmentCount: shipments.length,
                source: sourceDestInfo?.source,
                destination: sourceDestInfo?.destination,
                totalWeight: shipments.reduce((sum, s) => sum + (s.totalWeightInKg || 0), 0),
                totalVolume: shipments.reduce((sum, s) => sum + (s.totalVolume || 0), 0),
                vehicleTypes: multiTripInfo?.vehicleTypes || [],
                materialTypes: multiTripInfo?.materialTypes || []
            };

            res.status(200).json({ 
                message: "Group details fetched successfully", 
                summary,
                shipments
            });
        }catch(err) {
            res.status(500).json({ error: "An error occurred while fetching group details: " + err.message });
        }
    }

    static async updateGroupTypes(req, res) {
        try {
            const { groupId } = req.params;
            const { vehicleTypes, materialTypes } = req.body;

            const updated = await shipmentService.updateMultiTripTypes(groupId, vehicleTypes, materialTypes);

            res.status(200).json({ 
                message: "Group types updated successfully", 
                data: updated
            });
        }catch(err) {
            res.status(500).json({ error: "An error occurred while updating group types: " + err.message });
        }
    }
}

module.exports = shipmentController;