const ShipmentModel = require("../models/shipmentModel");
const SourceDestinationModel = require("../models/SourceDestinationModel");
const MultiTripTypeModel = require("../models/MultiTripTypeModel");

const postShipmentService = async(shipmentData) => {
    try {
        const shipmentDetails = await ShipmentModel.create(shipmentData);
        await createSourceDestinationEntry(shipmentData);
        await createMultiTripTypeEntry(shipmentData);
        return shipmentDetails;
    }catch(err) {
        throw err;
    }
}

const getShipmentService = async() => {
    try {
        return await ShipmentModel.find();
    }catch(err) {
        throw err;
    }
}

const bulkCreateShipments = async(shipmentsArray) => {
    try {
        const createdShipments = await ShipmentModel.insertMany(shipmentsArray);
        
        const groupedByGroupId = {};
        createdShipments.forEach(shipment => {
            if (!groupedByGroupId[shipment.groupId]) {
                groupedByGroupId[shipment.groupId] = [];
            }
            groupedByGroupId[shipment.groupId].push(shipment);
        });

        for (const groupId in groupedByGroupId) {
            const groupShipments = groupedByGroupId[groupId];
            await createSourceDestinationEntry({
                groupId,
                source: groupShipments[0].source,
                destination: groupShipments[groupShipments.length - 1].destination,
                shipmentIds: groupShipments.map(s => s._id.toString())
            });

            const vehicleTypes = [...new Set(groupShipments.map(s => s.vehicleType))];
            const materialTypes = [...new Set(groupShipments.map(s => s.materialType))];
            
            await createMultiTripTypeEntry({
                groupId,
                vehicleTypes,
                materialTypes,
                shipmentIds: groupShipments.map(s => s._id.toString())
            });
        }

        return createdShipments;
    }catch(err) {
        throw err;
    }
}

const createSourceDestinationEntry = async(data) => {
    try {
        const existing = await SourceDestinationModel.findOne({ groupId: data.groupId });
        if (existing) {
            existing.source = data.source;
            existing.destination = data.destination;
            if (data.shipmentIds) {
                existing.shipmentIds = [...new Set([...(existing.shipmentIds || []), ...data.shipmentIds])];
            }
            await existing.save();
        } else {
            await SourceDestinationModel.create({
                groupId: data.groupId,
                source: data.source,
                destination: data.destination,
                shipmentIds: data.shipmentIds || []
            });
        }
    } catch(err) {
        console.error("Error in createSourceDestinationEntry:", err);
    }
}

const createMultiTripTypeEntry = async(data) => {
    try {
        const existing = await MultiTripTypeModel.findOne({ groupId: data.groupId });
        if (existing) {
            existing.vehicleTypes = [...new Set([...(existing.vehicleTypes || []), ...(data.vehicleTypes || [])])];
            existing.materialTypes = [...new Set([...(existing.materialTypes || []), ...(data.materialTypes || [])])];
            if (data.shipmentIds) {
                existing.shipmentIds = [...new Set([...(existing.shipmentIds || []), ...data.shipmentIds])];
            }
            await existing.save();
        } else {
            await MultiTripTypeModel.create({
                groupId: data.groupId,
                vehicleTypes: data.vehicleTypes || [],
                materialTypes: data.materialTypes || [],
                shipmentIds: data.shipmentIds || []
            });
        }
    } catch(err) {
        console.error("Error in createMultiTripTypeEntry:", err);
    }
}

const getSourceDestinationByGroupId = async(groupId) => {
    try {
        return await SourceDestinationModel.findOne({ groupId });
    } catch(err) {
        throw err;
    }
}

const getMultiTripTypeByGroupId = async(groupId) => {
    try {
        return await MultiTripTypeModel.findOne({ groupId });
    } catch(err) {
        throw err;
    }
}

const updateMultiTripTypes = async(groupId, vehicleTypes, materialTypes) => {
    try {
        return await MultiTripTypeModel.findOneAndUpdate(
            { groupId },
            {
                vehicleTypes: [...new Set(vehicleTypes)],
                materialTypes: [...new Set(materialTypes)]
            },
            { new: true }
        );
    } catch(err) {
        throw err;
    }
}

const getShipmentsByGroupId = async(groupId) => {
    try {
        return await ShipmentModel.find({ groupId });
    } catch(err) {
        throw err;
    }
}

module.exports = {
    postShipmentService,
    getShipmentService,
    bulkCreateShipments,
    createSourceDestinationEntry,
    createMultiTripTypeEntry,
    getSourceDestinationByGroupId,
    getMultiTripTypeByGroupId,
    updateMultiTripTypes,
    getShipmentsByGroupId
}