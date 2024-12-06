const express = require("express");
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose');
const port = 8080;

const initData = require("./init.js");

MONGO_URL = 'mongodb://127.0.0.1:27017/amazone';

main().then(()=> {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const path = require("path");

const Product = require("./models/product.js");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
// app.use(cors());

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/signin", (req,res) => {
    res.render("signin");
});


app.get("/new", (req,res) => {
    res.render("new.ejs");
})

app.get("/view", async (req,res) => {
    try {
        const Prodct = await Product.find();
        res.render("view.ejs", { Prodct });
    } catch (err) {
        console.log(err, "Error fetching the products");
        res.status("Oops! Error fetching the Products");
    }
})

// app.options("127.0.0.1", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "127.0.0.1")
// });

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})



