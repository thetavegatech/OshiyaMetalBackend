const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/WeightMasterRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const userRoute = require("./Router/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const AssetRoutes = require('./Routes/AssetRoute');

app.use("/api/users", userRoute);
app.use(router);

// Connect to MongoDB
mongoose
  // .connect("mongodb://localhost:27017/OshiyaMetal", {
    .connect( "mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/OshiyaMetals?retryWrites=true&w=majority", {
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
  entries: [
    {
      MotherCoilId: Number,
      remainingWeightValue: Number,
      Slitcut: String,
      combinedId: String,
      SlitSrNo: Number,
          SlitWidth: Number,
      NoOfSlit: Number,
      OdSize: Number,
      WTMM: Number,
      SlitWeigth: Number,
      TotalWeigth: Number,
      Trimm: Number,
      Scrap: Number,
      remainingWeight: Number,
      date: { type: Date, default: Date.now }
    },
  ],
});
entrySchema.pre('save', function (next) {
  this.entries.forEach((entry) => {
    // Assuming MotherCoilId and SlitSrNo are available in the entry
    entry.combinedId = `${entry.MotherCoilId}/${entry.SlitSrNo}`;
  });
  next();
});

const Entry = mongoose.model("Entry", entrySchema);

// Endpoint to save an array of entries
app.post("/api/saveEntries", async (req, res) => {
  try {
    const newEntry = new Entry({ entries: req.body });
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
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
    const combinedId = `${motherCoilId}/${slitSrNo}`;

    // Find the entry by combinedId
    const entry = await Entry.findOne({ "entries.combinedId": combinedId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found for the provided combinedId' });
    }

    // Find the specific entry within the entries array
    const specificEntry = entry.entries.find(e => e.combinedId === combinedId);

    if (!specificEntry) {
      return res.status(404).json({ message: 'Specific entry not found within the entry document' });
    }

    res.json(specificEntry);
  } catch (error) {
    console.error("Error fetching entry by combinedId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get combined IDs
app.get("/api/getCombinedIds", async (req, res) => {
  try {
    // Fetch all unique combined IDs from your MongoDB collection
    const combinedIds = await Entry.distinct("entries.combinedId");

    res.json(combinedIds);
  } catch (error) {
    console.error("Error fetching combined IDs:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

app.listen(5001, () => {
  console.log("Server is running on Port 5000");
});