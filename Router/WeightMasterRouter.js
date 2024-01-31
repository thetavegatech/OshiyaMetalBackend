const express = require("express")
const {CreateWeightMaster, getWeightMaster, getId} = require("../Controller/WeightMasterController")
const { CreateMotherCoil, getdatabySrNo, getAllSrNos, getAllMotherCoilData } = require("../Controller/MotherCoilController")
const { CreateSlittingMaster, getTotalWeight, getAllslittingData } = require("../Controller/SlittingController")
const { getDailyproPlanData, DailyProPlanSave } = require("../Controller/DailyProPlanController")
const { getDailyproReportData, DailyProReportSave } = require("../Controller/DailyProReportController")
// const weightMasterController = require("../controllers/weightMasterController")


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

// Daily Produnction Report Router 
router.post("/api/saveproreport", DailyProReportSave)

router.get("/api/getdailyproreportdata", getDailyproReportData)

module.exports = router;