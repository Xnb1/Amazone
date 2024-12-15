const express = require("express");
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
const router = express.Router();
const path = require("path");
const Product = require("./models/product.js");
const User = require("./models/user.js");
const isLoggedIn = require("./middleware.js");
const port = 8080;

// const initData = require("./init.js");
MONGO_URL = 'mongodb://127.0.0.1:27017/amazone';

main().then(()=> {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires: Date.now() + 1* 1* 60* 60* 1000,
        maxAge: 1* 1* 60* 60* 1000,
        httpOnly: true
    }
}));
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

app.get("/view", isLoggedIn, async (req,res) => {
    try { 
        const Prodct = await Product.find();
        res.render("view.ejs", { Prodct, user: req.user });
        
    } catch (err) {
        console.log(err, "Error fetching the products");
    }
});

//creating account
app.post("/new", async (req,res) => {
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
app.post("/signin", async (req, res) => {
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





// app.options("127.0.0.1", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "127.0.0.1")
// });

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})



