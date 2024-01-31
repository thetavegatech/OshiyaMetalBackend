const MotherCoilModel = require("../Models/MothorCoilModel")


const CreateMotherCoil = async (req, res) => {
    try {
      // Capture all fields dynamically from the request body
      const requestData = req.body;
  
      // Create a new MotherCoil document
      const newMotherCoil = new MotherCoilModel(requestData);
  
      // Save the document to the database
      const savedMotherCoil = await newMotherCoil.save();
  
      res.status(201).json(savedMotherCoil); // Return the saved document in the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  const getdatabySrNo = async (req, res) => {
    const srno = req.params.srno;
    try {
      const data = await MotherCoilModel.findOne({ SrNo: srno });
  
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  const getAllSrNos = async (req, res) => {
    try {
      // Find all documents and project only the SrNo field
      const allSrNos = await MotherCoilModel.find({}, { SrNo: 1, _id: 0 });
  
      if (!allSrNos || allSrNos.length === 0) {
        return res.status(404).json({ message: 'No data found' });
      }
  
      // Extract SrNo values from the result array
      const srNos = allSrNos.map(item => item.SrNo);
  
      res.json(srNos);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Route for retrieving all SrNos
  const getAllMotherCoilData = async (req, res) => {
    try{
      const getdata = await MotherCoilModel.find({})
      res.json(getdata)
    }catch(err){
      res.status(500).json({message : "Internal Server Error"})
    }
  }



module.exports = {
    CreateMotherCoil,
    getdatabySrNo,
    getAllSrNos,
    getAllMotherCoilData
}