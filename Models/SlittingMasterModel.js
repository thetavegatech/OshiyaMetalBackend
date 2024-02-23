const mongoose = require("mongoose")

const SlittingSchama = new mongoose.Schema({
    MotherCoilId: {
        type: Number,
    },
    SlitSrNo: {
        type: Number,
    },
    combinedId: {
        type: Number,
        unique: true,  
    },
    SlittingSrNo: {
        type: Number,
        require: true,
        // unique: true,   
    },
    SlittingSrNo: {
        type: Number,
        require: true,
        // unique: true,   
    },
    GR: {
        type: String
    },
    GRNO: {
        type: Number
    },
    CoilWidth: {
        type: Number
    },
    CoilWeigth: {
        type: Number
    },
    SlitWidth: {
        type: Number
    },
    NoOfSlit: {
        type: Number
    },
    OdSize: {
        type: Number
    },
    WTMM: {
        type: Number
    },
    SlitWeigth: {
        type: Number
    },
    TotalWeigth: {
        type: Number
    },
    Trimm: {
        type: Number
    },
    Scrap: {
        type: Number
    },
    Yeilds: {
        type: Number
    },
    RemainingSlits: {
        type: Number
    },
    UsedSlits: {
        type: Number
    },
    Date: {
        type: Date,
        default: Date.now,
    }
})



const SlittingModel = mongoose.model("Slitting", SlittingSchama)
module.exports = SlittingModel

