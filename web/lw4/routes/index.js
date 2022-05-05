//@flow
var express = require('express');
var router = express.Router();

const peopleFileName = './public/jsonFiles/members.json';

let images = require('../public/jsonFiles/paintings');
let members = require('../public/jsonFiles/members');
let settings = require('../public/jsonFiles/settings');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', (req, res)=>{
  res.render('admin', {title: "admin", settings: settings, members: members, paintings: images})
});

router.get('/mem/:id([0-9]{1,})', (req, res)=>{
  let id = req.params.id;
  //console.log("req.query = ", req.query)
  if (members[id]) {
    //console.log("---------------member = ", members[id])
    res.render('member', {title:members[id].name, mem: members[id]});
  }
});

router.get('/enterLogin', (req, res) => {
  //console.log("body =",req.body);
  //console.log("query.login =",req.query.login);

  let login = req.query.login;
  if(login === "admin"){
    res.redirect('/admin');
    return;
  }
  else{
    for (let i in members){
      //console.log("i = ", i, "login = ", members[i].login);
      if (members[i].login === login){
        res.redirect('/mem/'+i);
        return;
      }
    }
  }
  res.redirect('/');
});

router.get('/mem/:id/paintings', (req, res) => {
  //console.log(req.params.id);
  let id = req.params.id;
  if (members[id]){
    let imgs = [];
    for (let i in images){
      if(images[i].owner === id){
        imgs.push(images[i]);
      }
    }
    res.render('onesPaintings', {count: imgs.length, images: imgs, owner: members[id]});
  }
});

module.exports = router;
