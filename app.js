const express= require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");


var app= express();
app.set("view engine","ejs");
app.use(express.static(__dirname +'/public/'));
//app.use("/public", express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/secrets");
const trySchema= new mongoose.Schema({
    email: String,
    password: String
});
const item = mongoose.model("second",trySchema);

app.get("/",function(req,res){
    res.render("home");
});
app.post("/register",(req,res)=>{
    const newUser = new item ({
        email : req.body.username,
        password: req.body.password
    });
    newUser.save();
    res.render("secrets");
});
app.post("/login",(req,res)=>{
        const username = req.body.username;
        const password= req.body.password;
    item.findOne({email:username})
        .then(function(foundUser){
                if(foundUser.password === password){
                    res.render("secrets")
                }
            })
        .catch;
        })     
 
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});



app.listen(5003,function(){
    console.log("server started");
});
