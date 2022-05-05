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
http.listen(3000);
