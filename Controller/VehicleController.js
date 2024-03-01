// const DailyProductionReport = require("../Models/DailyProReport")
// const Vehicletracking = require("../Models/VehicleTracking")

const Vehicletracking = require('../Models/VehicleTracking');

// Controller to handle the creation of a new vehicle tracking record
const createVehicleTracking = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      vehicleNo,
      totalNOPrime,
      customerDetails,
      date,
      deliveryDate,
      status
    } = req.body;

    // Create a new vehicle tracking record
    const newVehicleTracking = new Vehicletracking({
      vehicleNo,
      totalNOPrime,
      customerDetails,
      date,
      deliveryDate,
      status
    });

    // Save the new record to the database
    await newVehicleTracking.save();

    // Respond with success message
    res.status(201).json({ success: true, message: 'Vehicle tracking record created successfully.' });
  } catch (error) {
    // Handle errors
    console.error('Error creating vehicle tracking record:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller to handle the retrieval of all vehicle tracking records
const getAllVehicleTracking = async (req, res) => {
    try {
      // Fetch all vehicle tracking records from the database
      const allVehicleTracking = await Vehicletracking.find();
  
      // Respond with the retrieved records
      res.status(200).json({ success: true, data: allVehicleTracking });
    } catch (error) {
      // Handle errors
      console.error('Error retrieving vehicle tracking records:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

module.exports = { createVehicleTracking, getAllVehicleTracking  };
