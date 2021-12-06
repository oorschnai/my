var express = require('express');
var router = express.Router();
const fs = require('fs');
const imgFileName = './public/paintings.json';
const peopleFileName = './public/members.json';
const settingsFileName = './public/settings.json';

let images = require('../public/paintings');
let people = require('../public/members');
let settings = require('../public/settings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('images', { title: 'Картины', images: images});
});

router.get('/people', (req, res) => {
  res.render('people', { title: 'Участники', people: people});
});

router.get('/settings', (req, res) => {
  res.render('settings', { title: 'Настройки', settings: settings[0] });
});

router.post('/editImg/:id', (req, res)=>{
  let id = req.params.id;
  console.log("in index id = ", id)
  if (images[id]){
    images[id].title = req.body.title;
    images[id].painter = req.body.painter;
    images[id].startPrice = req.body.price;
    images[id].minStep = req.body.min;
    images[id].maxStep = req.body.max;
    fs.writeFile(imgFileName, JSON.stringify(images, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    res.send();
  }
});

router.get('/deleteImg/:id', (req,res)=>{
  let id = req.params.id;
  if(images[id]){
    images.splice(id, 1);
    for(let i in images){
      images[i].id = i;
    }
    fs.writeFile(imgFileName, JSON.stringify(images, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    res.redirect('/');
  }
});

router.post('/addImg/:id', (req, res)=>{
  let id = req.params.id;
  let newImg = {
    id: images.length,
    title: req.body.title,
    painter: req.body.painter,
    startPrice: req.body.price,
    minStep: req.body.minStep,
    maxStep: req.body.maxStep,
    imgName: req.body.url
  };
  images.push(newImg);
  fs.writeFile(imgFileName, JSON.stringify(images, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
  res.redirect('/')
});

router.post('/editSettings', (req,res)=>{
  settings[0].date = req.body.date;
  settings[0].time = req.body.time;
  settings[0].timeout = req.body.timeout;
  settings[0].interval = req.body.interval;
  settings[0].pause = req.body.pause;
  fs.writeFile(settingsFileName, JSON.stringify(settings, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
  res.send();
});

router.get('/deletePers/:id', (req, res)=>{
  let id = req.params.id;
  if (people[id]){
    people.splice(id,1);
    for (let i in people){
      people[i].id = i;
    }
    fs.writeFile(peopleFileName, JSON.stringify(people, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    res.redirect('/people');
  }
});

router.post('/editPers/:id', (req, res) => {
  let id = req.params.id;
  if (people[id]){
    people[id].name = req.body.name;
    people[id].money = req.body.money;
    fs.writeFile(peopleFileName, JSON.stringify(people, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    res.send();
  }
});

router.post('/addMem/:id', (req, res)=>{
  let id = req.params.id;
  let newMem = {
    id: images.length,
    name: req.body.name,
    money: req.body.money,
    img: req.body.photo
  };
  people.push(newMem);
  fs.writeFile(peopleFileName, JSON.stringify(people, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
  res.redirect('/people')
});

module.exports = router;
