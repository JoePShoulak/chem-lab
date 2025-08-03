require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const glasswareRouter = require("./routes/glassware");
const inventoryRouter = require("./routes/inventory");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
// Support both new `/api/*` endpoints and legacy paths without the prefix
app.use("/api/glassware", glasswareRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/glassware", glasswareRouter);
app.use("/inventory", inventoryRouter);

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch(err => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
