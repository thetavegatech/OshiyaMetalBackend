const mongoose = require("mongoose")


const WeightSchema = new mongoose.Schema({
    RST : {
        type : Number,       
    },
    EnterDate : {
        type : Date,        
    },
    VehicalName : {
        type : String,       
    },
    Material : {
        type : String,      
    },
    Contains : {
        type : String,       
    },
    GrossKGS : {
        type : Number,
    },
    TareKG : {
        type : Number
    },
    NetKGS : {
        type : Number,
    },
    Charges : {
        type : Number,
    },
    Date: {
        type: Date,
        default: Date.now,
      },
      Image: {
        type: String,
        require: true      
    },
})

const WeightMaster = mongoose.model("WeightMaster", WeightSchema)

module.exports = WeightMaster