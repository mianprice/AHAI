const express = require("express");
const bodyParser = require('body-parser');
const request = require("request-promise");
const pgp = require('pg-promise')();
const config = require('./config');
var db = pgp(config);

var app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

app.get("/", function(req, res, next){
    res.render('home.hbs');
});

app.post("/search_result", function(req, res, next){
  var zipcode=req.body.zipcode;
  var category=req.body.category;
  var subcategory=req.body.subcategory;
  var rating=req.body.rating;
  var price=req.body.price;
  var walkingtime=req.body.walkingtime;
  var transittype=req.body.transittype;
  var viewtype = req.body.viewtype;
  // Make a call to the yelp API

  // Filter the results on our end using marta db

  //display the resultset

});

app.get("/map", function(req, res, next){


  res.render("map.hbs");
});

app.get("/table", function(req, res, next){


  res.render("table.hbs");
});

app.get("/specific/:id", function(req, res, next){


  res.render("specific.hbs");
});

app.listen(9001, function(){
    console.log("listening on 9001");
});
