const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/Item");
const dummyItems = [];

router.get("/", async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const items = await Item.find();
    res.json(items);
  } else {
    res.json(dummyItems);
  }
});

router.post("/", async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.status(201).json(newItem);
  } else {
    const newItem = { name: req.body.name };
    dummyItems.push(newItem);
    res.status(201).json(newItem);
  }
});

module.exports = router;
