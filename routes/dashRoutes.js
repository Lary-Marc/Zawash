const express = require('express')
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory')
const Carmonitor = require('../models/Carmonitor');
const Washer = require('../models/Washer');
const router = express.Router()
const moment = require('moment')
// router.get('/', (req, res) => {
//     res.render('dashboard', {
//       title: 'Dashboard',
//       routeName:"dash"
//     });
//   });
  router.get('/', async (req, res) => {
	  try{
		  //use moment to get selected date and default date
	let selectedDate = moment().format('YYYY-MM-DD')
	if(req.query.searchdate)
	selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')


//based on selected date, query to get the count of vehicles per wash
//& payout per washer
    let washedVehicles = await Carmonitor.aggregate(
      [ {$match: {date: new Date(selectedDate)} },
	  {	$group: { _id: '$washer', count: { $sum: 1 }, totalPayout: { $sum: '$washerFee' }} },
      { $lookup: { from:'washers', localField:'_id', foreignField:'_id', as:"details"}}
    ]);
	//get total payout for all the washers based on the selected date
	let totalPayPerDay = await Carmonitor.aggregate(
		[ {$match: {date: new Date(selectedDate)} },
		{	$group: { _id: '$date', totalPayoutPerDay: { $sum: '$washerFee' }} }
		
	  ]);
    res.render("dashboard" , {washers: washedVehicles,  title:"Dashboard", 
	defaultDate: selectedDate, sumPayout:totalPayPerDay[0], routeName:"dash"})
  }
catch(err) {
	console.log(err)
	res.send('Failed to retrive payout details')
}
})

router.get('/washerDetails', async (req, res) => {
    try {
        // find all the data in the Washers collection
        let washerDetails = await Washer.find();
        res.render('washerDetails', { users: washerDetails, title: 'Washer Details' })
    } catch (err) {
        console.log(err)
        res.send('Failed to retrive washer details');
    }
})

router.get('/expenses-report', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day
        let expenseDetails = await Inventory.find({ date: selectedDate })

        // query for total expense on a day
        let totalExpense = await Inventory.aggregate([
            { $match: { date: new Date(selectedDate) } },
            { $group: { _id: '$date', totalExpense: { $sum: '$price' } } }
        ])

        res.render("expenseReport", {
            expenses: expenseDetails, total: totalExpense[0],
            title: "Expenses", defaultDate: selectedDate
        })
    } catch (err) {
        // console.log(err)
        res.send('Failed to retrive Expense details');
    }
})

router.get('/collection', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day

        let collectionDetails = await Carmonitor.find({ date: selectedDate })

        // query for total expense on a day
        let totalCollection = await Carmonitor.aggregate([
            { $match: { date: new Date(selectedDate) } },
            { $group: { _id: '$date', totalCollection: { $sum: '$packagePrice' } } }
        ])

        res.render("collectionReport", {
            collections: collectionDetails, total: totalCollection[0],
            title: "Collections", defaultDate: selectedDate
        })

    } catch (err) {
        console.log(err)
        res.send('Failed to retrive collections details');
    }
})

router.get('/parked', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')


        // let parkingDetails = await Carmonitor.find({ date: selectedDate })

		let parkingDetails = await Carmonitor.aggregate(
			[ {$match: {date: new Date(selectedDate)} },
			{	$group: { _id: '$package', count: { $sum: 1 }} }
			
		  ]);
		//   console.log(parkingDetails)
        res.render("carsInBay", {
            parkings: parkingDetails,
            title: "Vehicles In Bay", defaultDate: selectedDate
        })

    } catch (err) {
        console.log(err)
        res.send('Failed to retrive collections details');
    }
})

module.exports = router