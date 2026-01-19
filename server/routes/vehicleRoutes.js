const express = require("express");
const router = express.Router();
const VechicleController = require('../controller/vechicleController');


console.log("i am in vechile router");
router.route("/").post(VechicleController.createVehicles).get(VechicleController.getAllVehicles);

module.exports = router;