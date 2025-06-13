if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const path = require("path");
const cookieParser = require("cookie-parser");
const isLoggedIn = require("./middleware.js");
const port = process.env.PORT || 10000;
const dbUrl = process.env.ATLASDB_URL;

   // 1.connecting to mongodb
main().then(() => {
    console.log("connected to database");
    console.log("Mongoose is connected to:", mongoose.connection.db.databaseName);
    //2.requiring routes
    const userRouter = require("./routes/user.js");
    const cartRouter = require("./routes/cart.js");
    const productRouter = require("./routes/product.js");

    // 3.session store
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

    //4.middleware setup
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(cookieParser("secretcode"));
    app.use(express.static(path.join(__dirname,"public")));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.use(
     session({
      store,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      },
     })
    );

  //5.local user access in EJS
  app.use(isLoggedIn);
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  }); 

  //6.Routes
  app.get("/", (req,res) => {
    console.log(req.signedCookies);
    res.render("index.ejs");
  }); 
  
  app.use("/", userRouter);
  app.use("/", productRouter);
  app.use("/", cartRouter);

  //7.start server
   app.listen(port, () => {
    console.log(`app is listening to ${port}`);
   });

}).catch (err => {
    console.log("MongoDB connection error",err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

 







// app.use(session({
//     sessionOptions,
//     secret: 'keyboard',
//     resave: false,
//     saveUninitialized: true,
//     cookie : {
//         expires: Date.now() + 1* 1* 60* 60* 1000,
//         maxAge: 1* 1* 60* 60* 1000,
//         httpOnly: true
//     }
// }));














// app.options("127.0.0.1", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "127.0.0.1")
// });





