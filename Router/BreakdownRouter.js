// routes/breakdownRoutes.js
const express = require('express');
const router = express.Router();
const breakdownController = require('../Controller/BreakdownController');

// Create a new breakdown
router.post('/breakdowns', breakdownController.createBreakdown);

// Get all breakdowns
router.get('/breakdowns', breakdownController.getAllBreakdowns);

// Get a single breakdown by ID
router.get('/breakdowns/:id', breakdownController.getBreakdownById);

// Update a breakdown by ID
router.put('/breakdowns/:id', breakdownController.updateBreakdownById);

// Delete a breakdown by ID
router.delete('/breakdowns/:id', breakdownController.deleteBreakdownById);

module.exports = router;
