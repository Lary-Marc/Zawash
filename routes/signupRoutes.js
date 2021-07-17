const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Washer = require("../models/Washer");

router.get("/", (req, res) => {
  res.render("signup", {
    title: "Register Employee",
    routeName: "washer",
    alert: req.query.alert,
  });
});

router.post("/", async (req, res) => {
  try {
    const washer = new Washer(req.body);
    await washer.save();

    res.redirect("washer?alert=success");
  } catch (err) {
    res
      .status(400)
      .render("signup", { title: "Register Employee", alert: "error" });
    console.log(err);
  }
});

router.post("/delete-washer", async (req, res) => {
  try {
    await Washer.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete item in the database");
  }
});

module.exports = router;
