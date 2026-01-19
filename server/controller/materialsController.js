const materilasVAlidator = require("../validator/materialsValidator");
const materialService = require("../lib/materialsService");

class MaterialsController {
        static async createMaterials (req, res) {
        try {
            console.log("1");
            const { error } = materilasVAlidator.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const materialDetails = await materialService.postMaterialService(req.body);
            console.log("materialDetails",materialDetails);
            return res.status(201).json(materialDetails);
        } catch (err) {
            console.log("Err",err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAllMaterials (req, res) {
        try {
            const allMaterials = await materialService.getAllMaterials();
            res.status(200).json({ message: "Materials fetched successfully", allMaterials });
        }catch(err) {
            console.log("error", err);
            res.status(500).json({ err: "An error occurred while fetching Materials" });
        }
}
}

module.exports = MaterialsController;