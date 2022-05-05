var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");

var stocks=require("../json/stocks.json")
var brokers=require("../json/brokers.json")
var settings=require("../json/settings.json")

router.get('/', function(req,res,next) {
  res.redirect("http://localhost:4200/main")
});

router.get('/stocks', function(req,res,next) {
  res.end(JSON.stringify(stocks));
});

router.post('/stocks', function(req,res,next) {
  let got=req.body;
  fs.writeFile(__dirname+"/../json/stocks.json",JSON.stringify(got, null, 2),function(err, result) {
    if(err) {}
  });
  stocks = got;
});

router.get('/brokers', function(req,res) {
  res.end(JSON.stringify(brokers));
});

router.post('/brokers', function(req,res) {
  let got=req.body;
  fs.writeFile(__dirname+"/../json/brokers.json",JSON.stringify(got, null, 2),function(err, result) {
    if(err) {}
  });
  brokers = got;
});

router.get('/settings', function(req,res) {
  res.end(JSON.stringify(settings));
});

router.post('/settings', function(req,res) {
  let got=req.body;
  fs.writeFile(__dirname+"/../json/settings.json",JSON.stringify(got, null, 2),function(err, result) {
    if(err) {}
  });
  settings = got;
});

router.get('*', function (req,res){
  res.status(404);
  res.end()
});

module.exports = router;
