var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const Rollbar = require("rollbar");
//const rollbar = new Rollbar("access-token");
var rollbar = new Rollbar({
    accessToken: '12154659537c43bfa9180e8ea86615f5',
    captureUncaught: true,
    captureUnhandledRejections: true,
});
rollbar.log("TestError: Hello World!");

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();
//
const server = require('http').createServer(app);
server.listen(3000);
//


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



////////////////////
//const io = require('./routes/socket.js')(server)
let settings = require('./public/jsonFiles/settings.json');
let paintings = require('./public/jsonFiles/paintings.json');
let members = require('./public/jsonFiles/members.json');

const { Server } = require("socket.io");
const io = new Server(server);

let currentImgid  = 0;

io.sockets.on('connection', (socket)=>{
    //console.log("connect")
    rollbar.log("new person connected");
    socket.on('hello', (msg)=>{
        socket["name"] = msg.name;
        io.sockets.emit("smbdConnect", {msg: `Присоединился ${msg.name}`, settings: settings, paintings: paintings});
    });

    socket.on('start', ()=>{
        rollbar.log("start auction");
        io.sockets.emit('start', { picture: paintings[currentImgid], settings: settings});
    });

    socket.on('startSale', () => {
        rollbar.log("start sale painting");
        io.sockets.emit('startSale', {picture: paintings[currentImgid], id:currentImgid, settings: settings})
    });

    socket.on('nextPainting', (data) => {
        console.log('next!');
        rollbar.log("going to next or end");
        console.log('curr id = ', data.currImgId+1, ' len ', paintings.length);
        if (members[data.owner]){
            paintings[data.currImgId].owner = data.owner;
            paintings[data.currImgId].endPrice = paintings[data.currImgId].currPrice;
            members[data.owner].money = Number(Number(members[data.owner].money)-Number(paintings[data.currImgId].currPrice))
            console.log("id = ", data.owner, " money = ", members[data.owner].money)
        }
        if (data.currImgId+1 < paintings.length) {
            currentImgid = data.currImgId + 1;
            rollbar.log("next");
            io.sockets.emit('nextPainting', {picture: paintings[data.currImgId + 1], settings: settings, members: members});
        }
        else {
            rollbar.log("end");
            io.sockets.emit('end', {members: members})
        }
    });

    socket.on('bet', (data) => {
        console.log('data id = ', data.id);
        if (members[data.id]) {
            let bet = Number(data.bet);
            let min = Number(paintings[currentImgid].minStep);
            let max = Number(paintings[currentImgid].maxStep);
            let money = Number(members[data.id].money);
            let currPrice = Number(paintings[currentImgid].currPrice);
            console.log(bet, min, max, currPrice+bet, bet >= min, bet <= max, money >= currPrice+bet);
            if (bet >= min && bet <= max && money >= currPrice+bet) {
                rollbar.log("make bet");
                console.log("Enough money to make bet");
                paintings[currentImgid].currPrice = Number(bet+currPrice);
                io.sockets.emit('bet', {bet: bet, mem: members[data.id], price: currPrice+bet});
            }
        }
    });
});
////////////////////

module.exports = app;
