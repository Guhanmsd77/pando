const vechileValidator = require("../validator/vehicleValidator");
const vechileService = require("../lib/vechicleService");

class VechicleController {
    static async createVehicles (req, res) {
        try {
            console.log("1");
            const { error } = vechileValidator.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const vechicleDetails = await vechileService.postVechicleService(req.body);
            console.log("vechicleDetails",vechicleDetails);
            return res.status(201).json(vechicleDetails);
        } catch (err) {
            console.log("Err",err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAllVehicles (req, res) {
        try {
            const allVechicleData = await vechileService.getVechicleService();
            res.status(200).json({ message: "Vechicles fetched successfully", allVechicleData });
        }catch(error) {
            console.log("error",error);
            res.status(500).json({ error: "An error occurred while fetching vechicles" });
        }
}
}

module.exports = VechicleController;