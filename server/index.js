require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const glasswareRouter = require("./routes/glassware");
const ppeRouter = require("./routes/ppe");
const equipmentRouter = require("./routes/equipment");
const inventoryRouter = require("./routes/inventory");
const chemicalRouter = require("./routes/chemicals");
const miscRouter = require("./routes/misc");

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
app.use(["/api/glassware", "/glassware"], glasswareRouter);
app.use(["/api/ppe", "/ppe"], ppeRouter);
app.use(["/api/equipment", "/equipment"], equipmentRouter);
app.use(["/api/chemicals", "/chemicals"], chemicalRouter);
app.use(["/api/misc", "/misc"], miscRouter);
app.use(["/api/inventory", "/inventory"], inventoryRouter);

// PLAYGROUND
const formula_regex = /[A-Z][a-z]?\d*/g;

const r = "CH4+O2";
const p = "CO2+H2O";

const get_atoms = molecule => {
  const atoms = [];

  molecule.forEach(m => {
    m.match(formula_regex).forEach(a => {
      a = a.replace(/\d+/g, "");
      if (!atoms.includes(a)) atoms.push(a);
    });
  });

  return atoms;
};

const arraysEqual = (a, b) =>
  a.length === b.length && a.every((val, i) => val === b[i]);

const balance_reaction = (reactants, products) => {
  const reactant_molecules = reactants.replace(/\s+/g, "").split("+");
  const product_molecules = products.replace(/\s+/g, "").split("+");

  const reactant_atoms = get_atoms(reactant_molecules);
  const product_atoms = get_atoms(product_molecules);

  if (!arraysEqual(reactant_atoms.sort(), product_atoms.sort()))
    return console.error(
      "Reactants and Products contain different atoms, cannot balance."
    );

  // TODO: Switch to using a dict here

  console.log(reactant_molecules);
  console.log(product_molecules);
  console.log(reactant_atoms.sort());
  console.log(product_atoms.sort());
};

balance_reaction(r, p);

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
