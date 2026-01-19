const TransportValidator = require("../validator/transportValidator");
const TransportService = require("../lib/transportService");

class TransportController {
  static async createTransports(req, res) {
    try {
      const data = req.body;
      const validation = TransportValidator.validate(data);
      if (validation.error) {
        return res
          .status(400)
          .json({ error: validation.error.details[0].message });
      }
      const transportData = await TransportService.postTransportServcie(data);
      res
        .status(200)
        .json({ message: "Transports created successfully", transportData });
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating transports" });
    }
  }

  static async getAllTransports(req, res) {
    try {
      const allTransportData = await TransportService.getTransportService();
      res
        .status(200)
        .json({ message: "Transports created successfully", allTransportData });
    } catch (err) {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching transports" });
    }
  }
}

module.exports = TransportController;
