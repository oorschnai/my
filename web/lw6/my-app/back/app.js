var app = require('express')();
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/routes'));

const http = require('http').createServer(app);

const io = require('socket.io')(http, {origins: "http://localhost:3000"});

var brokers=require('./jsons/brokers.json')
var stocks=require('./jsons/stocks.json')

var user;
var started=false;

var id;

io.on('connection', function(socket) {
    console.log("React connected!");
    socket.on("start",function (data){
        let user;
        if(data!="admin"){
            brokers.forEach((b)=>{
                if(b.name==data){
                    user=b.id;
                }
            })
        }else{
            user="admin";
        }
        socket.emit("start_2",{tab: user,brokers: brokers, stocks: stocks});
    })
    socket.on("bought",(data)=>{
        brokers[data.who].have[data.what]++;
        stocks[data.what].have--;
        brokers[data.who].money-=stocks[data.what].cost;
        socket.broadcast.emit('update',{brokers: brokers, stocks: stocks})
    })
    socket.on("sold",(data)=>{
        brokers[data.who].have[data.what]--;
        stocks[data.what].have++;
        brokers[data.who].money+=stocks[data.what].cost;
        socket.broadcast.emit('update',{brokers: brokers, stocks: stocks})
    })
    socket.on("startstop",()=>{
        started=!started;
        if(started){
            id=setInterval(()=>{
                stocks.forEach((s)=>{
                    s.cost = changeCost(s.rule,s.cost,s.max);
                    socket.emit('renew',{stocks:stocks})
                    socket.broadcast.emit('renew',{stocks:stocks})
                })
            },2000)
        }else{
            clearInterval(id);
        }
    })
    function changeCost(type,cost,maxcost){
        let t=0;
        for(let i=0;i<3;i++){
            t+=Math.random();
        }
        t/=3;
        if(type==0){
            return Math.abs(Math.round(cost+((t-0.5))*maxcost*2))
        }
        return Math.abs(Math.round(cost+((Math.random()-0.5))*maxcost*2))
    }
})

http.listen(3030);
