const express = require('express')
const router = express.Router()
const Washer = require('../models/Washer')



router.get('/', (req, res) => {
    res.render('signup', {
      title: 'Register Employee',
      routeName:"washer",
      alert:req.query.alert

    });
  });

  router.post('/', async(req,res)=>{
    
   try{
    const washer = new Washer(req.body);    
    await washer.save() 

    res.redirect('washer?alert=success')
   }
     catch(err){
       res.status(400).render('signup', {title: 'Register Employee', alert: 'error'})
       console.log(err)
     }
    
  })



module.exports = router
