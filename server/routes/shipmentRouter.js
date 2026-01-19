const express = require("express");
const router = express.Router();
const shipmentController = require('../controller/shipmentController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.route("/").post(shipmentController.createShipment).get(shipmentController.getAllShipments);
router.route("/upload").post(upload.single('file'), shipmentController.uploadCsv);
router.route("/group/:groupId").get(shipmentController.getGroupDetails);
router.route("/group/:groupId/types").put(shipmentController.updateGroupTypes);

module.exports = router;