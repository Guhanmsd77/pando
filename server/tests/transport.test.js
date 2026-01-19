jest.mock("../models/TransportModel");
jest.mock("../validator/transportValidator");

const TransportController = require("../controller/transportController");
const TransportService = require("../lib/transportService");
const TransportModel = require("../models/TransportModel");
const TransportValidator = require("../validator/transportValidator");

describe("Transport Module Tests", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  const mockTransportData = {
    _id: "507f1f77bcf86cd799439011",
    name: "ABC Transport Company",
    email: "info@abctransport.com",
    gstNo: 123,
    address: "123 Main Street, chennai, India",
  };

  const mockTransportDataList = [
    mockTransportData,
    {
      _id: "507f1f77bcf86cd799439012",
      name: "XYZ Logistics",
      email: "contact@xyzlogistics.com",
      gstNo: 123,
      address: "456 Park Avenue, Delhi, India",
    },
    {
      _id: "507f1f77bcf86cd799439013",
      name: "Quick Delivery Services",
      email: "support@quickdelivery.com",
      gstNo: 123,
      address: "789 Market Road, Bangalore, India",
    },
  ];

  describe("TransportController - createTransports", () => {
    it("should create a transport successfully with valid data", async () => {
      mockRequest.body = {
        name: "ABC Transport Company",
        email: "info@abctransport.com",
        gstNo: 27271234567890,
        address: "123 Main Street, Mumbai",
      };

      TransportValidator.validate.mockReturnValue({ error: null });
      TransportModel.create.mockResolvedValue(mockTransportData);

      await TransportController.createTransports(mockRequest, mockResponse);

      expect(TransportValidator.validate).toHaveBeenCalledWith(
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Transports created successfully",
        transportData: mockTransportData,
      });
    });

    it("should return validation error for invalid data", async () => {
      mockRequest.body = {
        name: "ABC Transport",
      };

      const validationError = {
        error: {
          details: [{ message: "email is required" }],
        },
      };

      TransportValidator.validate.mockReturnValue(validationError);

      await TransportController.createTransports(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "email is required",
      });
    });
  });

  describe("TransportController - getAllTransports", () => {
    it("should retrieve all transports successfully", async () => {
      TransportModel.find.mockResolvedValue(mockTransportDataList);

      await TransportController.getAllTransports(mockRequest, mockResponse);

      expect(TransportModel.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Transports created successfully",
        allTransportData: mockTransportDataList,
      });
    });
  });

});