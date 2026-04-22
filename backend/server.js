const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const University = require("./models/University");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/uniguide")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));
// test route
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Create API to Save Data
app.post("/add", async (req, res) => {
  try {
    const uni = new University(req.body);
    await uni.save();
    res.send("University Saved ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create API to Get Data
app.get("/universities", async (req, res) => {
  const data = await University.find();
  res.json(data);
});