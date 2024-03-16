

const express = require('express');
const router = express.Router();
const { createVehicleTracking, getAllVehicleTracking } = require('../Controller/VehicleController');

// Route to handle the creation of a new vehicle tracking record
router.post('/vehicletracking', createVehicleTracking);

// Route to retrieve all vehicle tracking records
// Route to retrieve all vehicle tracking records
router.get('/vehicletracking', getAllVehicleTracking);

module.exports = router;
