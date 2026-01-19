const MaterialModel = require("../models/MaterialModel");

const postMaterialService = async(materialData) => {
    try {
        const materialsDetails = await MaterialModel.create(materialData);   
        return materialsDetails;
    }catch(err) {
        console.log(err.message);
        return err.message;
    }
}

const getAllMaterials = async() => {
    try {
        const getAllMaterials = await MaterialModel.find();
        return getAllMaterials;
    }catch(err) {
        return err.message;
    }
}

module.exports = {
    postMaterialService,
    getAllMaterials
}