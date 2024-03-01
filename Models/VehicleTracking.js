const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const vehicleSchema = mongoose.Schema({
    vehicleNo: {
        type: Number,
        require: true
    },
    totalNOPrime: {
        type: String,
        require: true,
        // unique: true
    },
    customerDetails: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    }
});

const Vehicletracking = mongoose.model('Vehicletracking', vehicleSchema)

module.exports = Vehicletracking;