const express = require("express")
const {CreateWeightMaster, getWeightMaster, getId} = require("../Controller/WeightMasterController")
const { CreateMotherCoil, getdatabySrNo, getAllSrNos, getAllMotherCoilData,updateMotherCoil,getfullcutrecordsmothercoil } = require("../Controller/MotherCoilController")
const { CreateSlittingMaster, getTotalWeight, getAllslittingData, getEntriesBySlitSrNo} = require("../Controller/SlittingController")
const { getDailyproPlanData, DailyProPlanSave, getDailyproPlanById,updateProductionPlanStatus, dailyproplan,getPendingProductionPlanNos, dailyproplanNo, getProductionPlanNos} = require("../Controller/DailyProPlanController")
const { getDailyproReportData, DailyProReportSave } = require("../Controller/DailyProReportController")
// const weightMasterController = require("../controllers/weightMasterController")
// const slittingController = require('../controllers/slittingController');


const router = express()


//route for Weight Master 

//get all weight master data 
router.get("/api/getweightdata", getWeightMaster)
// this route for save the data of weight master 
router.post("/api/weightmaster" , CreateWeightMaster)

router.get("/getId/:id", getId)



//mother coild router below request

//this route create the mothercoil data 
router.post("/api/mothercoils", CreateMotherCoil)
//this route find the data according to SRNO 
router.get('/api/data/srno/:srno', getdatabySrNo)
//This Route find the all SrNo which are present in database 
router.get("/api/allSrNos", getAllSrNos)
//This route for get All data of motherCoil data
router.get("/api/getallmothercoildata" , getAllMotherCoilData)
// Add the new route for getting entries by SlitSrNo
router.get('/entries/:SlitSrNo',getEntriesBySlitSrNo)

// add the cut in the mothercoil
router.post("/api/updatebymothercoil", updateMotherCoil)
//getfull cut records
router.get("/api/getfullcutrecordsmothercoil" , getfullcutrecordsmothercoil)


//Slitting master router 

//This route for create the data SlittingMaster data 
router.post("/api/slittingmaster", CreateSlittingMaster)
// This route for fetching data according the mothercoil no data fetch 
router.get("/api/getTotalWeight/:mothermoilno", getTotalWeight)
//route for getting all the data form the database 
router.get("/api/getallSlitingdata" , getAllslittingData)

//Daily Production Plan  

//Daily Production Plan Plan router 
router.post("/api/saveproplan", DailyProPlanSave)
//This route for the getall data 
router.get("/api/getdailyproplandata", getDailyproPlanData)

router.get("/api/getDailyproPlanById/:id", getDailyproPlanById)

// Daily Produnction Report Router 
router.post("/api/saveproreport", DailyProReportSave)

router.get("/api/getdailyproreportdata", getDailyproReportData)

router.get("/api/dailyproplan/:productionPlanNo", dailyproplan)
 
router.get("/api/dailyproplanNos", dailyproplanNo)

// Define a new route for getting pending production plan numbers
router.get('/api/getPendingProductionPlanNos', getPendingProductionPlanNos);

router.put('/updateProductionPlanStatus/:productionPlanNo',updateProductionPlanStatus)

router.get("/api/getProductionPlanNos", getProductionPlanNos)

module.exports = router;