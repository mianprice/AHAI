const express = require("express");
const bodyParser = require('body-parser');
const request = require("request-promise");

var app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res, next){
    res.render('home.hbs');
});

app.listen(9001, function(){
    console.log("listening on 9001");
});
