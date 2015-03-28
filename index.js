var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var mongojs = require('mongojs');
var db = mongojs('mongodb://46.101.47.120:27017/test', ['users', 'project']);
var requestIp = require('request-ip');
var request = require("request");

var ips = [];

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.enable('trust proxy');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/find', function(req, res) {
  var str = '[';
    db.project.find(function(err, docs) {
        var find = false;
          for (var i = 0; i < docs.length; i++) {
            if (docs[i].name == req.body.name){
              str += JSON.stringify(docs[i]);
              if(i != docs.length - 1)
                str += ','
              find = true;
            }
          }
        str += ']';
        res.send(str);
        if(find == false) res.send('404, no projects found')
    });
});

app.post('/create', function(req, res){
  //Anti-Spam Logic
/*  for (var i = 0; i < ips.length; i++) {
   console.log(ips[i].ip.toString());
    if(ips[i].ip.toString()  == req.body.ip.toString()){
     if(Date.now() - ips[i].time > 60000){
        ips.splice(i, 1);
      } else {
         var time = 60000-(Date.now() - ips[i].time);
         i = ips.length + 1;
         res.send('');
         return;
     }
    }
  }; */
  var long = req.body.lng.toString();
  var lat = req.body.lat.toString();
  var body = req.body;

  request("http://api.tiles.mapbox.com/v4/geocode/mapbox.places/"+ long + "," + lat + ".json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q", 
  function(err, response, json) {
    json = JSON.parse(json);
    if(err) console.log(err);
    var code = json.features[0].context[1].text.replace(/\s+/g, '');
    request("http://www.theyworkforyou.com/api/getMP?postcode=" + code + "&output=js&key=DwYWcpGWgECfBVxJVHFqc7bx&output=js",
      function(err, response, b){
        b = JSON.parse(b);

        body.mpConstituency = b.constituency;
        body.mpParty = b.party;
        body.mpImage = b.image;
        body.mpName = b.full_name;

        console.log('\n' + b.full_name);
        console.log('New Create Request: ' + req.body, req.body.ip.toString());
        ips.push({ip: req.body.ip.toString(), time: Date.now()});
        db.project.insert(body);
        db.project.find(function(err, docs) {
        console.log(JSON.stringify(docs));
      });
    });
  });
  res.end('200: Success');
});

app.get('/points',function(req, res){
  db.project.find(function(err, docs){
    res.send(docs);
  });
});

app.post('/remove', function(req, res){
  db.project.remove({name: req.body.name});
  db.project.find(function(err, docs) {
    console.log(JSON.stringify(docs))
  });
  res.end('200: Success');
});
app.get('*', function(req, res){
  res.send('<center><img src="http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg">', 404);
});

var server = app.listen(80, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});