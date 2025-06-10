const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware.js");
const Product = require("../models/product.js");

router.get("/view",isLoggedIn, async (req,res) => {
    try { 
        const Prodct = await Product.find();
        console.log("fetching products", Prodct);
        const user = req.user;
        if (isLoggedIn) {
           res.render("view.ejs", { Prodct, user });
        } else {
            res.render("view.ejs", { Prodct })
        }

    } catch (err) {
        console.log(err, "Error fetching the products");
    }
});



module.exports = router;