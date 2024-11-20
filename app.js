const express = require("express");
const app = express();
// const cors = require('cors');
const port = 8080;

const path = require("path");
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

// app.options("127.0.0.1", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "127.0.0.1")
// });

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})



