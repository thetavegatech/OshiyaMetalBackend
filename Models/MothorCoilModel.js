const mongoose = require("mongoose")

const MotherCoilSchema = new mongoose.Schema({
    MotherCoilId: {
        type: Number,
        require: true
    },
    SrNo: {
        type: Number,
        require: true,
        unique: true,   
    },
    CompanyName: {
        type: String,
        require: true
    },
    Width: {
        type: Number,
        require: true
    },
    Thickness: {
        type: Number,
        require: true
    },
    Weigth: {
        type: Number,
        require: true
    },
    ActualCoilWidth : {
        type : Number
    },
    ActualCoilWeigth : {
        type : Number
    },
    Grade : {
        type : Number
    },
    CoilType : {
        type : String
    },
    // RemainingWeigth: {
    //     type: Number,
    // },
    // UsedWeigth: {
    //     type: Number,
    // },
    // CertificateNo: {
    //     type: Number,
    // },
    Date: {
        type: Date,
        default: Date.now,
    }
})

const MotherCoilModel = mongoose.model("MotherCoil", MotherCoilSchema)

module.exports = MotherCoilModel