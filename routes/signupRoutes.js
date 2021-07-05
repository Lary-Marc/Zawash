const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
    res.render('signup', {
      title: 'Register Employee'
    });
  });
  router.post("/",(req,res)=>{
    console.log(req.body)
    res.send("The data has been submitted")
  })



module.exports = router