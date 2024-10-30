const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/signin", (req,res) => {
    res.render("signin");
})

app.get("/new", (req,res) => {
    res.render("new.ejs");
})

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})



