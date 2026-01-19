const TransportModel = require("../models/TransportModel");

const postTransportServcie = async(transportData) => {
    try {
        const transportDetails = await TransportModel.create(transportData);
        console.log("transportDetails",transportDetails);
        return transportDetails;
    }catch(err) {
        console.log(err.message);
        return err.message;
    }
}

const getTransportService = async() => {
    try {
        const getAllTransports = await TransportModel.find();
        return getAllTransports;
    }catch(err) {
        return err.message;
    }
}

module.exports = {
    postTransportServcie,
    getTransportService
};