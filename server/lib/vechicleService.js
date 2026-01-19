const vechicleModel = require("../models/VechicleModel");

const postVechicleService = async(vechicleData) => {
    try {
        const vechicleDetails = await vechicleModel.create(vechicleData);   
        return vechicleDetails;
    }catch(err) {
        console.log(err.message);
        return err.message;
    }
}

const getVechicleService = async() => {
    try {
        const getAllVechicles = await vechicleModel.find();
        return getAllVechicles;
    }catch(err) {
        return err.message;
    }
}

module.exports = {
    postVechicleService,
    getVechicleService
}