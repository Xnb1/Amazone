const express = require("express");
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
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

const path = require("path");

const Product = require("./models/product.js");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
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

app.get("/view", async (req,res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/view');
        } 
        const Prodct = await Product.find();
        res.render("view.ejs", { Prodct, user: req.session.user });
        
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
        return res.status(401).send("Invalid email or password. Please try again");
       }

       req.session.user = user;
       
        
    // const Prodct = await Product.find();
    //    const allUsers = await User.find({});
    //    for (let user of allUsers) {
    //       if (email !== user.email && password !== user.password) {
    //         res.send("Please signin again");
    //       } else {
    //     res.render("view.ejs",{ Prodct, allUsers });
       res.redirect("/view");     
    //       }
    //     }
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



