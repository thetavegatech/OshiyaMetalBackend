// controllers/breakdownController.js
const Breakdown = require('../Models/Breakdown');

// Create a new breakdown
exports.createBreakdown = async (req, res) => {
  try {
    const breakdown = new Breakdown(req.body);
    await breakdown.save();
    res.status(201).json(breakdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all breakdowns
exports.getAllBreakdowns = async (req, res) => {
  try {
    const breakdowns = await Breakdown.find();
    res.status(200).json(breakdowns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single breakdown by ID
exports.getBreakdownById = async (req, res) => {
  try {
    const breakdown = await Breakdown.findById(req.params.id);
    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }
    res.status(200).json(breakdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a breakdown by ID
exports.updateBreakdownById = async (req, res) => {
  try {
    const breakdown = await Breakdown.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }
    res.status(200).json(breakdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a breakdown by ID
exports.deleteBreakdownById = async (req, res) => {
  try {
    const breakdown = await Breakdown.findByIdAndDelete(req.params.id);
    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
