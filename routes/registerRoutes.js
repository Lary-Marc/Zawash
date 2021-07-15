const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Carmonitor = require('../models/Carmonitor');  
const Washer = require('../models/Washer');

washPackages = {
  smallcar: { washerFee: 3000, packagePrice: 10000 },
  mediumcar: { washerFee: 4000, packagePrice: 15000 },
  fullwash: { washerFee: 5000, packagePrice: 20000 },
  bodaboda: { washerFee: 1500, packagePrice: 5000 },
  truck: { washerFee: 4000, packagePrice: 20000 },
  engine: { washerFee: 2000, packagePrice: 10000 }
}

router.get('/', async (req, res) => {
  let washerList = await Washer.find()
    res.render('registration', {
  
      title: 'Register of cars',
      routeName:"register",
      washers: washerList,
      alert:req.query.alert
    });
  });

  router.post("/", async(req,res)=>{
    try{

      let data = req.body
      let datetimeArrival = Date.parse(data.date + 'T' + data.time)
      data.datetimeArrival = datetimeArrival

 //derive the package price and the washer fee
 let packageDetails = washPackages[data.package]

 data.packagePrice = packageDetails['packagePrice']
 data.washerFee = packageDetails['washerFee']


      const carmonitor = new  Carmonitor(req.body);    
      await carmonitor.save()
      res.redirect('cartracking?alert=success')
    }
            
    catch(err){
      res.status(400).render('registration', {title: 'Register of cars', alert: 'error'})
      console.log(err)
    }
}) 


module.exports = router