const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/WeightMasterRouter")
const bodyParser = require("body-parser")
const cors = require("cors")



const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


const userRoute = require("./Router/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
// const AssetRoutes = require('./Routes/AssetRoute');


app.use("/api/users", userRoute)
app.use(router);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/OshiyaMetal", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

  //Router for Weight master 
  app.use(router)


app.listen(5001, () => {
  console.log("Server is running on Port 5000");
});
