const express = require('express')
const router = express.Router()
const Inventory = require('../models/Inventory')

  router.get('/', (req, res) => {
    res.render('inventory', {
      title: 'Inventory',
      routeName:"inventory",
      alert:req.query.alert
    });
  });
  router.post("/", async(req,res)=>{
    try{
   const inventory = new Inventory(req.body);    
     await inventory.save() 
     res.redirect('inventory?alert=success')        
    }  
    catch(err){
      res.status(400).render('inventory', {title: 'Inventory', alert: 'error'})
      console.log(err)
    }
  })


module.exports = router

