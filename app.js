if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const express = require("express");
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');

const path = require("path");
const cookieParser = require("cookie-parser");
const Product = require("./models/product.js");
const User = require("./models/user.js");
const Cart = require("./models/cart.js");
const isLoggedIn = require("./middleware.js");
const port = process.env.PORT || 8080;
const userRouter = require("./routes/user.js");
const cartRouter = require("./routes/cart.js");
const productRouter = require("./routes/product.js");


// const initData = require("./init.js");
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to database");
}).catch (err => {
    console.log(err);
});
async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
}); 

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000*60*60*24*3,
        maxAge : 1000*60*60*24*3,
        httpOnly : true
    }
};


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session(sessionOptions));
app.use(cookieParser("secretcode"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use(session({
//     secret: 'keyboard',
//     resave: false,
//     saveUninitialized: true,
//     cookie : {
//         expires: Date.now() + 1* 1* 60* 60* 1000,
//         maxAge: 1* 1* 60* 60* 1000,
//         httpOnly: true
//     }
// }));
// app.use(cors());

// app.get("/verify", (req,res) => {
//     res.cookie ("color" , "red", {signed: true});
//     res.send("you sent some cookies");
// })

app.get("/", (req,res) => {
    console.log(req.signedCookies);
    res.render("index.ejs");
});


// app.post("/add-to-cart", async (req, res) => {
//     res.send("post req working")
// });

app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", cartRouter);

app.use(isLoggedIn);
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


// app.options("127.0.0.1", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "127.0.0.1")
// });

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})



