var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var mongojs = require('mongojs');
var db = mongojs('mongodb://46.101.47.120:27017/test', ['users', 'project']);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/find/:name', function(req, res) {
    db.project.find(function(err, docs) {
        var find = false;
          for (var i = 0; i < docs.length; i++) {
            if (docs[i].ProjectName == req.params.name)
              res.send(JSON.stringify(docs[0]));
          }
        if(find == false) res.end('404, no projects found')
    });
});

app.get('/create/key=:key&name=:pName&desc=:pDesc&photo=:pPhoto&long=:pLong&lat=:pLat', function(req, res){
  if(req.params.key != "y0l0")
    res.end('Not Allowed')
  res.send(req.params.pName);
});

app.post('/create', function(req, res){
  db.project.insert(req.body);
  db.project.find(function(err, docs) {
    console.log(JSON.stringify(docs))
  });
  res.end('200: Success');
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

var server = app.listen(8080, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});