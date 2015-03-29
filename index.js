var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['users', 'project']);
var requestIp = require('request-ip');
var request = require("request");
require('./routes')(app, db);

var ips = [];

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.enable('trust proxy');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('*', function(req, res){
  res.send('<center><img src="http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg">', 404);
});

var server = app.listen(80, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});