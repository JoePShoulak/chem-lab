// server/index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
const { MONGO_URI } = process.env;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB error: ", err));
} else {
  console.log("⚠️  MONGO_URI not set. Skipping MongoDB connection.");
}

// Routes
app.get("/", (req, res) => {
  res.send("API Running!");
});

const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
