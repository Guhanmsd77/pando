const express = require("express");
const router = express.Router();
const MaterialsController = require('../controller/materialsController');

router.route("/").post(MaterialsController.createMaterials).get(MaterialsController.getAllMaterials);

module.exports = router;