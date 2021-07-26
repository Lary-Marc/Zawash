const express = require("express");
const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");
const Carmonitor = require("../models/Carmonitor");
const Washer = require("../models/Washer");
const router = express.Router();
const moment = require("moment");
// router.get('/', (req, res) => {
//     res.render('dashboard', {
//       title: 'Dashboard',
//       routeName:"dash"
//     });
//   });
router.get("/", async (req, res) => {
  try {
    //use moment to get selected date and default date
    let selectedDate = moment().format("YYYY-MM-DD");
    if (req.query.searchdate)
      selectedDate = moment(req.query.searchdate).format("YYYY-MM-DD");

    //based on selected date, query to get the count of vehicles per wash
    //& payout per washer
    let washedVehicles = await Carmonitor.aggregate([
      { $match: { date: new Date(selectedDate) } },
      {
        $group: {
          _id: "$washer",
          count: { $sum: 1 },
          totalPayout: { $sum: "$washerFee" },
        },
      },
      {
        $lookup: {
          from: "washers",
          localField: "_id",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);
    //get total payout for all the washers based on the selected date
    let totalPayPerDay = await Carmonitor.aggregate([
      { $match: { date: new Date(selectedDate) } },
      { $group: { _id: "$date", totalPayoutPerDay: { $sum: "$washerFee" } } },
    ]);
    res.render("dashboard", {
      washers: washedVehicles,
      title: "Dashboard",
      defaultDate: selectedDate,
      sumPayout: totalPayPerDay[0],
      routeName: "dash",
    });
  } catch (err) {
    console.log(err);
    res.send("Failed to retrive payout details");
  }
});

router.get("/washerDetails", async (req, res) => {
  try {
    // find all the data in the Washers collection
    let washerDetails = await Washer.find();
    res.render("washerDetails", {
      users: washerDetails,
      title: "Washer Details",
    });
  } catch (err) {
    console.log(err);
    res.send("Failed to retrive washer details");
  }
});

router.get("/expenses-report", async (req, res) => {
  try {
    let selectedDate = moment().format("YYYY-MM-DD");
    if (req.query.searchdate)
      selectedDate = moment(req.query.searchdate).format("YYYY-MM-DD");

    // query for returning all expenses on a day
    let expenseDetails = await Inventory.find({ date: selectedDate });

    // query for total expense on a day
    let totalExpense = await Inventory.aggregate([
      { $match: { date: new Date(selectedDate) } },
      { $group: { _id: "$date", totalExpense: { $sum: "$price" } } },
    ]);

    res.render("expenseReport", {
      expenses: expenseDetails,
      total: totalExpense[0],
      title: "Expenses",
      defaultDate: selectedDate,
    });
  } catch (err) {
    // console.log(err)
    res.send("Failed to retrive Expense details");
  }
});

router.get("/collection", async (req, res) => {
  try {
    // let selectedDate
    // let start_date
    // let end_date

    if (req.query.searchdate) {
      let selectedDate = moment(req.query.searchdate).format("YYYY-MM-DD");
      // data where date is = selected date
      let collectionDetails = await Carmonitor.find({ date: selectedDate });

      // query for returning all incomes on a day
      let totalCollection = await Carmonitor.aggregate([
        { $match: { date: new Date(selectedDate) } },
        {
          $group: { _id: "$date", totalCollection: { $sum: "$packagePrice" } },
        },
      ]);
      // console.log(totalCollection)

      res.render("collectionReport", {
        collections: collectionDetails,
        total: totalCollection[0],
        title: "Collections",
        defaultDate: selectedDate,
      });
    } else if (req.query.start_date && req.query.end_date) {
      let start_date = moment(req.query.start_date).format("YYYY-MM-DD");
      let end_date = moment(req.query.end_date).format("YYYY-MM-DD");

      // query za data --- where start_date >= date <= end_date

      let collectionDetails = await Carmonitor.find({
        date: { $lte: end_date, $gte: start_date },
      });
      let totalCollection = await Carmonitor.aggregate([
        {
          $match: {
            date: { $lte: new Date(end_date), $gte: new Date(start_date) },
          },
        },
        {
          $group: { _id: "$date", totalCollection: { $sum: "$packagePrice" } },
        },
      ]);
      // console.log(totalCollection)
      let total_amount = 0;
      for (let x = 0; x < totalCollection.length; x++) {
        total_amount += totalCollection[x].totalCollection;
      }
      // console.log(total_amount)

      res.render("collectionReport", {
        collections: collectionDetails,
        title: "Collections",
        total: { _id: "", totalCollection: total_amount },
      });
    } else {
      res.render("collectionReport", {
        alert: req.query.alert,
        collections: {
          datetimeArrival: "",
          carModel: "",
          numberPlate: "",
          packagePrice: "",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.send("Failed to retrive collections details");
  }
});

router.get("/parked", async (req, res) => {
  try {
    let selectedDate = moment().format("YYYY-MM-DD");
    if (req.query.searchdate)
      selectedDate = moment(req.query.searchdate).format("YYYY-MM-DD");

    let parkingDetails = await Carmonitor.aggregate([
      { $match: { date: new Date(selectedDate) } },
      { $group: { _id: "$package", count: { $sum: 1 } } },
    ]);
    //   console.log(parkingDetails)
    res.render("carsInBay", {
      parkings: parkingDetails,
      title: "Vehicles In Bay",
      defaultDate: selectedDate,
    });
  } catch (err) {
    console.log(err);
    res.send("Failed to retrive collections details");
  }
});

module.exports = router;
