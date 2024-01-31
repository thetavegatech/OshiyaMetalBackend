// const DailyProductionReport = require("../Models/DailyProReport")
const DailyProductionPlan = require("../Models/DailyProPlan")

const DailyProPlanSave = async (req, res) => {
   try{
       const reqDailyPlan = req.body

       const newDailyProReportData = new DailyProductionPlan(reqDailyPlan)

       const savePlan = await newDailyProReportData.save();

       res.status(200).json(savePlan)

   }catch(error){
       res.status(500).json({ error: "Internal Server Error" });
   }
}

const getDailyproPlanData = async (req, res) => {
   try{
       const getdata = await DailyProductionPlan.find({})
       res.status(200).json(getdata)

   }catch(err){
       res.status(500).json({err : "Internal Server Error"})

   }
}

module.exports = {
   DailyProPlanSave,
   getDailyproPlanData
}