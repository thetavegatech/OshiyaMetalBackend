const WeightMaster = require("../Models/WeightMasterModel")
const mongoose = require("mongoose")




const CreateWeightMaster = async (req, res) => {
    try {
      // Create a new WeightMaster instance with data from the request body
      const weightData = new WeightMaster(req.body);
  
      // Save the data to the database
      const savedWeight = await weightData.save();
  
      res.status(201).json(savedWeight);
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const getWeightMaster = async (req, res) => {
    try{
        const getWeight = await WeightMaster.find({})
        res.status(200).json(getWeight)
    }catch(err){
        console.log(err)
    }
  }

  const getWeightMasterById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Validate if the provided ID is a valid ObjectId
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
  
      // Find the weight master data by ID
      const weightData = await WeightMaster.findById(id);
  
      // Check if the weight master data with the given ID exists
      if (!weightData) {
        return res.status(404).json({ error: "Weight master data not found" });
      }
  
      res.status(200).json(weightData);
    } catch (error) {
      console.error("Error fetching data by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getId = async (req, res) => {
    try {
        const getWeight = await WeightMaster.findById(req.params.id);
        // this.setState({ assets: [response.data] });

        if (!getWeight) return res.status(404).send();
        res.send(getWeight);
    } catch (err) {
        res.status(500).send(err);
        
    }
};



  module.exports = {
    CreateWeightMaster,
    getWeightMaster,
    getWeightMasterById,
    getId
  }