//(1. dependencies)
const express = require('express'); 
const path = require('path');
//instatiate the express library and assign it to var app
//(2. instatiations)
const app = express(); 


//3. configurations
app.set('view engine', 'pug');
app.set('views', './views');



// (4. middleware)
//body-parser handles reading data from the form element
app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})) 

 // custom middleware to log the time of the current request
app.use('/registration',(req, res, next) => {
  console.log("A new request received at " + Date.now());
//app.use is used to add a middleware
  // This function call tells that more processing is
  // required for the current request and is in the next middleware
  
  next();  
});
//routes
app.get('/index', (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});
  app.get('/hello', (req, res) => {
    res.render('register');
  });
  
  app.get('/registration', (req, res) => {
    res.render('registration', {
      title: 'Register'
    });
  });
  app.post("/registration",(req,res)=>{
    console.log(req.body)
    res.send("The data has been submitted")
})

app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'SignUp'
  });
});
app.post("/signup",(req,res)=>{
  console.log(req.body)
  res.send("The data has been submitted")
})
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'LogIn'
  });
});
app.post("/login",(req,res)=>{
  console.log(req.body)
  res.send("The data has been submitted")
})



//routing

// this helps create a server defining the port, console.log will run whenever you listen to the port
app.listen(3600, () =>{
    console.log('listening on 3600')
  })