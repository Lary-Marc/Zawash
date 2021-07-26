const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("sign", { title: "Log In", alert: req.query.alert });
});

// checks username and password using passport
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login?alert=error" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/cartracking");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
