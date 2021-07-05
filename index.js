//(1. dependencies)
const express = require('express'); 
const path = require('path');
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const signupRoutes = require('./routes/signupRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const homeRoutes = require('./routes/homeRoutes')
const dashRoutes = require('./routes/dashRoutes')
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
  next();  
});


//routes
app.use('/registration', registerRoutes)
app.use('/index', homeRoutes)
app.use('/dashboard', dashRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)




  app.get('/hello', (req, res) => {
    res.render('register');
  });
  

//routing

// this helps create a server defining the port, console.log will run whenever you listen to the port
app.listen(3600, () =>{
    console.log('listening on 3600')
  })