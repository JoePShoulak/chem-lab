require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

// ✅ CORS middleware — allow from localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/items", itemsRouter);

fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetone/JSON")
  .then(res => res.json())
  .then(data => {
    const compound = data.PC_Compounds[0];
    console.log(compound.props); // contains weight, formula, names, etc.
  });

// Connect to MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
