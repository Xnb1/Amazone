const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/signin", (req,res) => {
    res.render("signin");
});

router.get("/new", (req,res) => {
    res.render("new.ejs");
});

//creating account
router.post("/new", async (req,res) => {
    try {
     let { name, email, password } = req.body;
     let user = new User({name, email, password});
      await user.save();
      res.redirect("/signin");

    } catch (err) {
        console.log(err);
    }
});

//signin in
router.post("/signin", async (req, res) => {
    try {
       let { email, password } = req.body;
       
       const user = await User.findOne({email, password});
       if (!user) {
        return res.send("Invalid email or password. Please try again");
       }
       req.session.user = user;
       res.redirect("/view");     
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;