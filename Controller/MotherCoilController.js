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
        // Find documents with Cut field not equal to 'full-cut' and project only the SrNo field
        const filteredSrNos = await MotherCoilModel.find({ Cut: { $ne: 'full-cut' } }, { SrNo: 1, _id: 0 });

        if (!filteredSrNos || filteredSrNos.length === 0) {
            return res.status(404).json({ message: 'No data found for the specified criteria' });
        }

        // Extract SrNo values from the result array
        const srNos = filteredSrNos.map(item => item.SrNo);

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


  const updateMotherCoil = async (req, res) => {
    try {
      const { motherCoilId, cut, Trimm, Scrap, UsedWeigth } = req.body;
  
      // Update the MotherCoil entry in the database based on motherCoilId with the new cut value
      await MotherCoilModel.updateOne({ MotherCoilId: motherCoilId }, { $set: { Cut: cut , Trimm : Trimm , Scrap : Scrap , UsedWeigth : UsedWeigth} });
  
      res.status(200).json({ message: 'MotherCoil cut updated successfully' });
    } catch (error) {
      console.error('Error updating MotherCoil cut:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getfullcutrecordsmothercoil = async (req, res) => {
    try {
      // Find records where Cut is equal to "full-cut"
      const getdata = await MotherCoilModel.find({ Cut: 'half-cut' });
      res.json(getdata);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


module.exports = {
    CreateMotherCoil,
    getdatabySrNo,
    getAllSrNos,
    getAllMotherCoilData,
    updateMotherCoil,
    getfullcutrecordsmothercoil
}