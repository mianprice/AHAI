const express = require("express");
const bodyParser = require('body-parser');
const request = require("request-promise");

var app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

app.get("/", function(req, res, next){
    res.render('home.hbs');
});

app.post("/search_result", function(req, res, next){
  //for house:
  var zipcode=req.body.zipcode;
  var type=req.body.type;
  var bedroom=req.body.bedroom;
  var bathroom=req.body.bathroom;
  var listdate=req.body.listdate;
  var walkingtime=req.body.walkingtime;
  var transittype=req.body.transittype;

  //for yelp(not changed yet):
  var zipcode=req.body.zipcode;
  var type=req.body.type;
  var bedroom=req.body.bedroom;
  var bathroom=req.body.bathroom;
  var listdate=req.body.listdate;
  var walkingtime=req.body.walkingtime;
  var transittype=req.body.transittype;
})

app.get("/search_map", function(req, res, next){
  

  res.render("map.hbs")
})

app.get("/search_table", function(req, res, next){

})

app.get("/search/:id", function(req, res, next){

})

app.listen(9001, function(){
    console.log("listening on 9001");
});
