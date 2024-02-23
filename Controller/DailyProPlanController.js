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

const getDailyproPlanById = async (req, res) => {
    try {
        const {id} = req.params;
        const plan = await DailyProductionPlan.findById(id);

        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.status(200).json(plan);
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};
const dailyproplan = async (req, res) => {
// router.get('/api/dailyproplan/:productionPlanNo', async (req, res) => {
    try {
      const { productionPlanNo } = req.params;
      const plan = await DailyProductionPlan.findOne({ productionPlanNo });
  
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
  
      res.status(200).json(plan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const dailyproplanNo = async (req, res) => {
//   router.get('/api/dailyproplan/:productionPlanNo', async (req, res) => {
    try {
      const { productionPlanNo } = req.params;
      const plan = await DailyProductionPlan.findOne({ productionPlanNo });
  
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
  
      res.status(200).json(plan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getProductionPlanNos = async (req, res) => {
//   router.get("/api/getProductionPlanNos", async (req, res) => {
    try {
      // Fetch all productionPlanNos from the database
      const productionPlanNos = await DailyProductionPlan.find({}, 'productionPlanNo');
  
      // Extract the productionPlanNo values into an array
      const productionPlanNoArray = productionPlanNos.map(plan => plan.productionPlanNo);
  
      res.status(200).json(productionPlanNoArray);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
module.exports = {
   DailyProPlanSave,
   getDailyproPlanData,
   getDailyproPlanById,
   dailyproplan,
   dailyproplanNo,
   getProductionPlanNos
}