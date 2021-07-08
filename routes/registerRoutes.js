const express = require('express')
const router = express.Router()


// router.get('/employee', (req, res) => {
//     res.render('signup', {
//       title: 'Register Employee'
//     });
//   });
//   router.post("/employee",(req,res)=>{
//     console.log(req.body)
 
//   })


  
router.get('/', (req, res) => {
    res.render('registration', {
      title: 'Register of cars',
      routeName:"register"
    });
  });
  router.post("/",(req,res)=>{
    console.log(req.body)
    
})


module.exports = router