var app = require('express')()


app.get('/', function(req, res){
res.send('hi')
})

app.listen(8080)
