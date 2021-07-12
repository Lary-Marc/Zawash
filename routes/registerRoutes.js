const express = require('express')
const router = express.Router()
const Carmonitor = require('../models/Carmonitor');  
const Washer = require('../models/Washer');

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