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
        type : String
    },
    CoilType : {
        type : String
    },
    Trimm : {
        type : Number
    },
    Scrap : {
        type : Number
    },
    UsedWeigth : {
        type : Number
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    Cut : {
        type : String
    }
})

const MotherCoilModel = mongoose.model("MotherCoil", MotherCoilSchema)

module.exports = MotherCoilModel