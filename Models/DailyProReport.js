const mongoose = require("mongoose")

const DailyProReport = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    selectedCombinedId: {
        type: String,
    },
    selectedProductionPlanNo: {
        type: Number,
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
    Scrap : {
        type : Number
    },
})

const DailyProductionReport = mongoose.model("DailyProReport", DailyProReport)

module.exports = DailyProductionReport