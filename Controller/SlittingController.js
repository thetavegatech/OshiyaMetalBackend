const mongoose = require("mongoose")
const SlittingModel = require("../Models/SlittingMasterModel")

const CreateSlittingMaster = async (req, res) => {
    try {
        // Extract slitting data from the request body
        const ReqSlittingData = req.body;

        // Create a new instance of the SlittingModel with the received data
        const newSlittingData = new SlittingModel(ReqSlittingData);

        // Save the new slitting data to the database
        const savedSlittingData = await newSlittingData.save();

        // Respond with the saved data and a 201 Created status
        res.status(201).json(savedSlittingData);
    } catch (error) {
        // Handle any errors that occur during the process
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const getTotalWeight = async (req, res) => {
    const mothermoilno = req.params.mothermoilno;

    try {
        const TotalWeigthCoil = await SlittingModel.find({ MotherCoilId: mothermoilno }, { TotalWeigth: 1, SlitWidth: 1, NoOfSlit: 1 });

        if (!TotalWeigthCoil || TotalWeigthCoil.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Calculate the sum of (SlitWidth * NoOfSlit) for each object
        const slitWeightSum = TotalWeigthCoil.reduce((sum, item) => {
            const slitWeight = item.SlitWidth * item.NoOfSlit;
            return sum + slitWeight;
        }, 0);

        // Calculate the sum of TotalWeigth values
        const totalWeightSum = TotalWeigthCoil.reduce((sum, item) => sum + item.TotalWeigth, 0);

        res.json({ totalWeightSum, slitWeightSum });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllslittingData = async (req, res) => {
    try{
        const getData = await SlittingModel.find({})
        res.status(200).json(getData);

    }catch(err){
        res.status(500).json({message : 'Internal Server Error'})

    }
}

const getEntriesBySlitSrNo = async (req, res) => {
    const SlitSrNo = req.params.SlitSrNo;

    try {
        const entries = await Entry.find({ 'entries.combinedId': SlitSrNo });

        if (!entries || entries.length === 0) {
            return res.status(404).json({ message: 'Entries not found for the specified SlitSrNo' });
        }

        res.json(entries);
    } catch (error) {
        console.error("Error fetching entries by SlitSrNo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    CreateSlittingMaster,
    getTotalWeight,
    getAllslittingData,
    getEntriesBySlitSrNo
}