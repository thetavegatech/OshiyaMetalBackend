const mongoose = require("mongoose")
// const AutoIncrement = require('mongoose-auto-increment');

const DailyProPlan = new mongoose.Schema({
    Date : {
        type: Date,
    },
    productionPlanNo: {
        type: Number,
        unique: true,
      },
      Plant: {
        type: String,
      },
    Size : {
        type : String
    },
    odSize : {
        type : Number
    },
    Thick : {
        type : Number
    },
    Length : {
        type : Number
    },
    Gr : {
        type : String
    },
    Weigth : {
        type : Number
    }, 
    Speed : {
        type : Number
    },
    ProdHr : {
        type : Number
    },
    TimeAvailable : {
        type : Number
    },
    TimeRequired : {
        type : Number
    },
    SlitNos : {
        type : Number
    },
    PlanMt : {
        type : Number
    },
    PrimeNos : {
        type : Number
    },
    PrimeWt : {
        type : Number
    },
    Scrap : {
        type : Number
    },
    PQ2 : {
        type : Number
    },
    PQ2Wt : {
        type : Number
    },
    Open : {
        type : Number
    },
    OpenWt : {
        type : Number
    },
    Joint : {
        type : Number
    },
    JointWt : {
        type : Number
    },
    CQ : {
        type : Number
    },
    CQWt : {
        type : Number
    },
    OdTrim : {
        type : Number
    },
    TestEnd : {
        type : Number
    },
    CoilTrim : {
        type : Number
    },
    ProdFTD : {
        type : Number
    },
    Yeilds : {
        type : Number
    },
    Target : {
        type : Number
    },
    roleChange : {
        type : String
    },
    rolechangetime : {
        type : Number
    },
    WorkHours : {
        type : Number
    },
    status : {
        type : String
    }
})
// proplanSchema.plugin(AutoIncrement.plugin, { model: 'Proplan', field: 'productionPlanNo' });

const DailyProductionPlan = mongoose.model("DailyProPlan", DailyProPlan)

module.exports = DailyProductionPlan