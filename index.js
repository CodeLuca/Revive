var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express()
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['users', 'project']);
var requestIp = require('request-ip');
var request = require("request");
var bcrypt = require('bcrypt');
var session = require('express-session')
var expressHbs = require('express-handlebars')

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: '1234567890QWERTY'}));
app.enable('trust proxy');
app.use(cors());

require('./files/routes')(app, db);
require('./files/accounts/signup')(app, bcrypt, db);
require('./files/accounts/login')(app, bcrypt, db, session);

var ips = [];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res){
	if(!req.session.username)
		res.redirect('/login')
	else {
		var data = {name: req.session.username}
		res.render('dashboard', data);
	}
});

app.get('*', function(req, res){
  res.send('<center><img src="http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg">', 404);
});

var server = app.listen(1337, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});