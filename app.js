const express = require("express");
const bodyParser = require('body-parser');
const request = require("request-promise");
const pgp = require('pg-promise')();
const config = require('./config');
const Yelp = require('yelp-api-v3');
var yelp = new Yelp({
  app_id: config.yelp.APPID,
  app_secret: config.yelp.APPSECRET
});
var db = pgp(config.dbconfig);
var current_result_set;

var app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

app.get("/", function(req, res, next){
    var stops, routes;
    db.any('select stop_name, route_id, stop_id from stops inner join route_stop using (stop_id)')
        .then((data)=>{
            stops = data.map((element)=>{
                return {name: element.stop_name, route_id: `route_id${element.route_id}`, stop_id: element.stop_id};
            });
            return db.any('select route_long_name, route_id from routes')
        })
        .then((data)=>{
            routes = data.map((element)=>{
                return {name: element.route_long_name, route_id: `route_id${element.route_id}`};
            });
            res.render('home.hbs', {
                routes: routes,
                stops:stops
            });
        })
        .catch(next);


});

app.post("/search_result", function(req, res, next){

      var search_term = req.body.search_term;
      var zipcode=req.body.zipcode;
      // var category=req.body.category;
      // var subcategory=req.body.subcategory;
      var limit = req.body.limit;
      var rating=req.body.rating;
      var price=req.body.price;
      // var walkingtime=req.body.walkingtime;
      // var transittype=req.body.transittype;
      var viewtype = req.body.viewtype;
      // Make a call to the yelp API
      var stop = req.body.stop;
      db.one('select stop_lat, stop_lon from stops where stop_id = $1', stop)
        .then((data)=> {
            return yelp.search({latitude: data.stop_lat, longitude: data.stop_lon, term: search_term, limit: limit, price: '1,2,3,4'});
        })
    .then((data) => {
      data = JSON.parse(data);
      // Filter the results on our end using marta db

      // display the resultset
      current_result_set = data;
      if (viewtype === 'map') {
        res.redirect('/map');
      } else if (viewtype === 'table') {
        res.redirect('/table');
      }

      // data["businesses"].forEach((element) => {
      //   var place2 = element.coordinates.latitude.toString() + "," + element.coordinates.longitude.toString();
      //   var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+place1+"&destination="+place2+"&mode=walking&key=AIzaSyBYC0MCm94ZwG-w5p9SR5PK25AYRjTEIw4"
      //   request(url)
      //   .then(function(str){
      //     var obj = JSON.parse(str)
      //     console.log(obj["routes"][0]["legs"][0]["duration"]["text"]);
      //     console.log(element.name + " || " + element.coordinates.latitude + " || " + element.coordinates.longitude);
      //     console.log();
      //   })
      //
      // });
    }).catch(next);
});

app.get("/map", function(req, res, next){
  var locations = current_result_set.businesses.map((element) => {
    var html_string = `<img src="${element.image_url}"><br><strong>${element.name.replace("'","&#39;")}</strong><br><a href="${element.url}">Check out on Yelp</a><br><span>Rating: ${element.rating}</span><br><span>Price: ${element.price}`;
    return {
      info: html_string,
      lat: element.coordinates.latitude,
      long: element.coordinates.longitude
    };
  });

  var coord = {
    lat: current_result_set.region.center.latitude,
    lon: current_result_set.region.center.longitude
  };

  res.render("map.hbs", {
    yelp_locations: locations,
    coord: coord
  });
});

app.get("/table", function(req, res, next){
  var rest = current_result_set.businesses.map((element) => {

    return {
      name: element.name,
      rating: element.rating,
      price: element.price,
      url: element.url
    };
  });

  res.render("table.hbs", {
    locations: rest
  });
});

app.get("/about", function(req, res, next){
  res.render("about.hbs");
})

app.get("/contact", function(req, res, next){
  res.render("contact_us.hbs");
})

// app.get("/specific/:id", function(req, res, next){
//
//
//   res.render("specific.hbs");
// });

app.listen(9001, function(){
    console.log("listening on 9001");
});
