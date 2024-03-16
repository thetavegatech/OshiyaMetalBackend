// models/Breakdown.js
const mongoose = require('mongoose');

const breakdownSchema = new mongoose.Schema({
  machineName: { type: String, required: true },
  breakdownType: { type: String },
  breakdownReason: { type: String },
  breakdownStartDate: { type: Date },
  breakdownStartTime: { type: String },
  Status: {type: String },
  username: {type: String },
//   lineName: { type: String, required: true },
//   operations: { type: String, required: true },
//   breakdownPhenomenons: { type: String},
});

const Breakdown = mongoose.model('Breakdown', breakdownSchema);

module.exports = Breakdown;
