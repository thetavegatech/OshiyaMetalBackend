 const DailyProductionReport = require("../Models/DailyProReport")

 const DailyProReportSave = async (req, res) => {
    try{
        const reqDailyPlan = req.body

        const newDailyProReportData = new DailyProductionReport(reqDailyPlan)

        const savePlan = await newDailyProReportData.save();

        res.status(200).json(savePlan)

    }catch(error){
        res.status(500).json({ error: "Internal Server Error" });
    }
 }

 const getDailyproReportData = async (req, res) => {
    try{
        const getdata = await DailyProductionReport.find({})
        res.status(200).json(getdata)

    }catch(err){
        res.status(500).json({err : "Internal Server Error"})

    }
 }

 module.exports = {
    DailyProReportSave,
    getDailyproReportData
 }