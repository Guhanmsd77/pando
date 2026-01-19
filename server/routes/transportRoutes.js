const express = require("express");
const router = express.Router();
const TransportController = require('../controller/transportController');

router.route("/").post(TransportController.createTransports).get(TransportController.getAllTransports);

module.exports = router;