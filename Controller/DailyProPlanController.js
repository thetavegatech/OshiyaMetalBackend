// const DailyProductionReport = require("../Models/DailyProReport")
const DailyProductionPlan = require("../Models/DailyProPlan")

const DailyProPlanSave = async (req, res) => {
  try {
    const reqDailyPlans = req.body;

    // Assuming `reqDailyPlans` is an array
    const newDailyProReportData = await DailyProductionPlan.insertMany(reqDailyPlans);

    res.status(200).json(newDailyProReportData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

  const getPendingProductionPlanNos = async (req, res) => {
    try {
      // Query the database for production plan numbers with status 'pending'
      const pendingPlans = await DailyProductionPlan.find({ status: 'Pending' });
  
      // Extract production plan numbers from the result
      const pendingPlanNos = pendingPlans.map((plan) => plan.productionPlanNo);
  
      res.status(200).json(pendingPlanNos);
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

  // PUT endpoint to update the status of a production plan
// router.put('/updateProductionPlanStatus/:productionPlanNo', (req, res) => {
  const updateProductionPlanStatus = async (req, res) => {
    const productionPlanNo = req.params.productionPlanNo;
  
    try {
      // Find the production plan in the database
      const planToUpdate = await DailyProductionPlan.findOne({ productionPlanNo });
  
      if (planToUpdate) {
        // Update the status to 'Complete'
        planToUpdate.status = 'Complete';
  
        // Save the updated plan
        await planToUpdate.save();
  
        // Send a success response
        res.json({ success: true, message: `Production plan ${productionPlanNo} status updated to Complete` });
      } else {
        // Send a not found response if the production plan is not in the database
        res.status(404).json({ success: false, message: `Production plan ${productionPlanNo} not found` });
      }
    } catch (error) {
      // Handle any errors that occurred during the operation
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  

  
module.exports = {
   DailyProPlanSave,
   getDailyproPlanData,
   getDailyproPlanById,
   dailyproplan,
   dailyproplanNo,
   getProductionPlanNos,
   getPendingProductionPlanNos,
   updateProductionPlanStatus
}