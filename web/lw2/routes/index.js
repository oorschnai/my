var express = require('express');
var router = express.Router();
const fs = require('fs');

const booksFileName = './public/books2.json';

let books = require('../public/books2');
for (let i in books){
  books[i].id = i;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Leti library', books: books });
});

router.get('/book/all', (req, res, next)=> {
  let id = "all";
  //console.log("all", books);
  res.send(JSON.stringify(books));
});

router.get('/book/inLibrary', (req, res, next)=> {
  let id = "inLibrary";
  let bookArr = [];
  for (let i in books){
    bookArr.push(books[i]);
    if(books[i].isInLib === 'нет'){
      bookArr[i].hidden = 1;
    } else {
      bookArr[i].hidden = 0;
    }
  }
  res.send(JSON.stringify(bookArr));
});

router.get('/book/date', (req, res, next)=> {
  let id = "date";
  let bookArr = [];
  for (let i in books){
    //console.log("book = ", i, " is in = ", books[i].isInLib )
    bookArr.push(books[i]);
    if(books[i].isInLib === 'да'){
      bookArr[i].hidden = 1;
    } else {
      let now = new Date();
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      let retDate = new Date(bookArr[i].returnDate);
      let dm = today-retDate;
      if (dm < 86400000){
        bookArr[i].hidden = 1;
      } else {
        bookArr[i].hidden = 0;
      }
    }
  }
  res.send(JSON.stringify(bookArr));
});

router.get('/book/:id([0-9]{1,})', (req, res, next) => {
  let id = req.params.id;
  //console.log("/book/id = ", id)
  if (books[id]){
    //console.log("before render = ", books[id].year)
    res.render('book', { title: 'Leti library', book: books[id] });
  }
});

router.get('/book/delete/:id([0-9]{1,})', (req, res, next)=>{
  let id = req.params.id;
  if(books[id]) {
    books.splice(id, 1);
    for (let i in books) {
      books[i].id = i;
    }
    //console.log(books);
    fs.writeFile(booksFileName, JSON.stringify(books, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(books));
      console.log('writing to ' + booksFileName);
    });
    res.redirect('/');
  }
  else{
    console.log("There's no book with id ", id)
  }
});

router.post('/book/changeInfo/:id', (req,res,next) => {
  console.log('____________')
  console.log("body = ", req.body);
  let id = req.params.id;
  books[id].bookTitle = req.body.titleChange;
  books[id].author = req.body.authorChange;
  books[id].year = req.body.yearChange;
  fs.writeFile(booksFileName, JSON.stringify(books, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(images));
    //console.log('writing to ' + imgFileName);
  });
  res.redirect('/book/'+id);
});

router.get('/backToMain', (req, res, next)=>{
  res.redirect('/');
});

router.post('/returnBook/:id', (req, res, next) => {
  let id = req.params.id;
  books[id].isInLib = "да";
  books[id].person = "-";
  books[id].returnDate = "-";
  fs.writeFile(booksFileName, JSON.stringify(books, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(images));
    //console.log('writing to ' + imgFileName);
  });
  res.redirect('/book/'+id);
});

router.post('/takeBook/:id', (req, res, next) => {
  let id = req.params.id;
  books[id].isInLib = "нет";
  books[id].person = req.body.person;
  books[id].returnDate = req.body.date.toString();
  console.log("----------------return date = ", books[id].returnDate)
  fs.writeFile(booksFileName, JSON.stringify(books, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(images));
    //console.log('writing to ' + imgFileName);
  });
  res.redirect('/book/'+id);
});

router.post('/addBook/:id', (req, res, next) => {
  let id = req.params.id;
  let year = new Date(req.body.year);
  year = year.getFullYear();
  console.log("============body title = ", req.body.title, " body author = ", req.body.author, " body year = ", year)
  let newB = {id: id,
              bookTitle: req.body.title,
              author: req.body.author,
              year: year,
              isInLib: "да",
              person: "-",
              returnDate: "-",
              hidden: "0"};
  books.push(newB);
  fs.writeFile(booksFileName, JSON.stringify(books, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(images));
    //console.log('writing to ' + imgFileName);
  });
  res.redirect('/');
});

module.exports = router;
