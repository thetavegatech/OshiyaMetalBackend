const mongoose = require("mongoose")

const DailyProPlan = new mongoose.Schema({
    Date : {
        type: Date,
    },
    Size : {
        type : Number
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
        type : Number
    },
    rolechangetime : {
        type : Number
    }
})

const DailyProductionPlan = mongoose.model("DailyProPlan", DailyProPlan)

module.exports = DailyProductionPlan