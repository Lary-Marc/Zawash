//(1. dependencies)
const express = require("express");
const moment = require("moment");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const managerRoutes = require("./routes/managerRoutes");
const registerRoutes = require("./routes/registerRoutes");
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const homeRoutes = require("./routes/homeRoutes");
const dashRoutes = require("./routes/dashRoutes");
const Manager = require("./models/Manager");
const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

//instatiate the express library and assign it to var app
//(2. instatiations)
const app = express();

//3. configurations
app.locals.moment = moment;
app.set("view engine", "pug");
app.set("views", "./views");

//mongodb connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// (4. middleware)
//body-parser handles reading data from the form element
app.use("/static", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(Manager.createStrategy());
passport.serializeUser(Manager.serializeUser());
passport.deserializeUser(Manager.deserializeUser());

var loginChecker = function (req, res, next) {
  if (req.path != "/login" && !req.session.user) {
    res.redirect("/login");
  }
  next();
};
app.use(loginChecker);
// custom middleware to log the time of the current request
app.use("/registration", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});


//routes
app.use("/", authRoutes);
app.use("/cartracking", registerRoutes);
app.use("/manager", managerRoutes);
app.use("/", homeRoutes);
app.use("/dashboard", dashRoutes);
app.use("/washer", signupRoutes);
app.use("/inventory", inventoryRoutes);

//routing

// this helps create a server defining the port, console.log will run whenever you listen to the port
app.listen(3600, () => {
  console.log("listening on 3600");
});
