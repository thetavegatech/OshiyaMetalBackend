const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/WeightMasterRouter");
const vehicleRoutes  = require("./Router/VehicleRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const breakdownRoutes = require('./Router/BreakdownRouter');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const userRoute = require("./Router/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const AssetRoutes = require('./Routes/AssetRoute');

app.use("/api/users", userRoute);
app.use(router);
app.use(vehicleRoutes);
app.use('/api', breakdownRoutes);


// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/OshiyaMetal", {
    //  .connect( "mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/OshiyaMetals?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

//Router for Weight master
app.use(router);

const entrySchema = new mongoose.Schema({
  MotherCoilId: Number, // Single MotherCoilId for all entries in the document
  entries: [
    {
      MotherCoilId: Number,
      SlitId: String,
      remainingWeightValue: Number,
      Slitcut: String,
      // combinedId: String,
      useNoofSlitinPlan: Number,
      SlitSrNo: Number,
      SlitWidth: Number,
      NoOfSlit: Number,
      OdSize: Number,
      WTMM: Number,
      SlitWeigth: Number,
      TotalWeigth: Number,
      date: { type: Date, default: Date.now }
    },
  ],
});
// entrySchema.pre('save', function (next) {
//   this.entries.forEach((entry) => {
//     // Assuming MotherCoilId and SlitSrNo are available in the entry
//     entry.combinedId = `${entry.MotherCoilId}/${entry.SlitSrNo}`;
//   });
//   next();
// });

const Entry = mongoose.model("Entry", entrySchema);

// Endpoint to save an array of entries
app.post("/api/saveEntries", async (req, res) => {
  try {
    // Extract data from the request body
    const { MotherCoilId, entries } = req.body;

    // Check if a document with the given MotherCoilId exists
    const existingEntry = await Entry.findOne({ MotherCoilId });

    if (existingEntry) {
      // If exists, append new entries to the existing entries array
      existingEntry.entries = existingEntry.entries.concat(entries);
      const updatedEntry = await existingEntry.save();
      res.json(updatedEntry);
    } else {
      // If not exists, create a new Entry document
      const newEntry = new Entry({
        MotherCoilId: MotherCoilId,
        entries: entries,
      });

      // Save the entry to the database
      const savedEntry = await newEntry.save();

      // Send the saved entry as a response
      res.json(savedEntry);
    }
  } catch (error) {
    console.error("Error saving entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to get all entries
app.get("/api/getEntries", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get an entry by entryId
app.get("/api/getEntryByEntryId/:entryId", async (req, res) => {
  try {
    const entryId = req.params.entryId;

    // Find the entry by entryId
    const entry = await Entry.findOne({ "entries._id": entryId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found for the provided entryId' });
    }

    // Find the specific entry within the entries array
    const specificEntry = entry.entries.find(e => e._id.toString() === entryId);

    if (!specificEntry) {
      return res.status(404).json({ message: 'Specific entry not found within the entry document' });
    }

    res.json(specificEntry);
  } catch (error) {
    console.error("Error fetching entry by entryId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update an entry by entryId
app.put("/api/updateEntry/:entryId", async (req, res) => {
  try {
    const entryId = req.params.entryId;
    const { SlitWidth, NoOfSlit, OdSize, WTMM, SlitWeigth, TotalWeigth, Trimm, Scrap } = req.body;

    // Find the entry by entryId
    const entry = await Entry.findOne({ "entries._id": entryId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found for the provided entryId' });
    }

    // Find the specific entry within the entries array
    const specificEntry = entry.entries.find(e => e._id.toString() === entryId);

    if (!specificEntry) {
      return res.status(404).json({ message: 'Specific entry not found within the entry document' });
    }

    // Update the entry fields
    specificEntry.SlitWidth = SlitWidth;
    specificEntry.NoOfSlit = NoOfSlit;
    specificEntry.OdSize = OdSize;
    specificEntry.WTMM = WTMM;
    specificEntry.SlitWeigth = SlitWeigth;
    specificEntry.TotalWeigth = TotalWeigth;
    specificEntry.Trimm = Trimm;
    specificEntry.Scrap = Scrap;

    // Save the updated entry document
    await entry.save();

    res.json({ message: 'Entry updated successfully', updatedEntry: specificEntry });
  } catch (error) {
    console.error("Error updating entry by entryId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get an entry by combinedId
app.get("/api/getEntryByCombinedId/:motherCoilId/:slitSrNo", async (req, res) => {
  try {
    const { motherCoilId, slitSrNo } = req.params;
    const SlitId = `${motherCoilId}/${slitSrNo}`;

    // Find the entry by combinedId
    const entry = await Entry.findOne({ "entries.SlitId": SlitId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found for the provided SlitId' });
    }

    // Find the specific entry within the entries array
    const specificEntry = entry.entries.find(e => e.SlitId === SlitId);

    if (!specificEntry) {
      return res.status(404).json({ message: 'Specific entry not found within the entry document' });
    }

    res.json(specificEntry);
  } catch (error) {
    console.error("Error fetching entry by SlitId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update noOfSlits by combinedId
app.put("/api/updateNoOfSlits/:motherCoilId/:slitSrNo", async (req, res) => {
  try {
    const { motherCoilId, slitSrNo } = req.params;
    const SlitId = `${motherCoilId}/${slitSrNo}`;

    // Assuming you have a model named 'Entry'
    const entry = await Entry.findOne({ "entries.SlitId": SlitId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found for the provided SlitId' });
    }

    // Find the specific entry within the entries array
    const specificEntry = entry.entries.find(e => e.SlitId === SlitId);

    if (!specificEntry) {
      return res.status(404).json({ message: 'Specific entry not found within the entry document' });
    }

    // Update the noOfSlits in the specific entry
    specificEntry.NoOfSlit = req.body.NoOfSlit;

    // Save the updated entry
    await entry.save();

    res.json({ message: 'NoOfSlits updated successfully' });
  } catch (error) {
    console.error("Error updating noOfSlits:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get combined IDs
app.get("/api/getCombinedIds", async (req, res) => {
  try {
    const uniqueSlitIds = await Entry.distinct('entries.SlitId');
    return res.json(uniqueSlitIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get("/calculateTotal/:motherCoilId", async (req, res) => {
  const { motherCoilId } = req.params;

  try {
    const result = await Entry.aggregate([
      {
        $match: { "entries.MotherCoilId": parseInt(motherCoilId) }, // Convert to number if stored as a number
      },
      {
        $unwind: "$entries", // Flatten the entries array
      },
      {
        $match: { "entries.MotherCoilId": parseInt(motherCoilId) }, // Match again after unwinding
      },
      {
        $group: {
          _id: null,
          totalWeight: { $sum: "$entries.TotalWeigth" },
          totalWidth: {
            $sum: { $multiply: ["$entries.SlitWidth", "$entries.NoOfSlit"] },
          },
          totalTrimm: { $sum: "$entries.Trimm" },
          totalScrap: { $sum: "$entries.Scrap" },
        },
      },
    ]);

    res.json({
      totalWeight: result[0] ? result[0].totalWeight : 0,
      totalWidth: result[0] ? result[0].totalWidth : 0,
      totalTrimm: result[0] ? result[0].totalTrimm : 0,
          totalScrap: result[0] ? result[0].totalScrap : 0,
    });
  } catch (error) {
    console.error("Error calculating total weight:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// below code is for update the existing entry 

// POST API to insert or update an entry based on MotherCoilId
// POST API to insert or update an entry based on MotherCoilId
// POST API to add an entry to a specific document based on _id
app.post('/api/entries/add/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if a document with the specified _id exists
    const existingDocument = await Entry.findById(id);

    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Add the new entry to the entries array of the existing document
    existingDocument.entries.push(req.body);

    // Save the updated document
    const updatedDocument = await existingDocument.save();

    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//below code for count 
// Add a new endpoint to get the count of entries for a specific MotherCoilId object
app.get('/api/objectEntryCount/:motherCoilId', async (req, res) => {
  try {
    const { motherCoilId } = req.params;

    // Find the entry with the given MotherCoilId
    const entry = await Entry.findOne({ MotherCoilId: motherCoilId });

    if (entry) {
      // Count the number of entries within the found MotherCoilId object
      const entryCount = entry.entries.length;

      res.json({ count: entryCount });
    } else {
      // If the entry is not found, return 0 count
      res.json({ count: 0 });
    }
  } catch (error) {
    console.error('Error fetching entry count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/updateentrybyplan', async (req, res) => {
  const { selectedCombinedId, slitNos /* other fields you want to update */ } = req.body;

  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { "entries.SlitId": selectedCombinedId },
      { $set: { "entries.$.useNoofSlitinPlan": slitNos, /* update other fields */ } },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    return res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.listen(5001, () => {
  console.log("Server is running on Port 5001");
});