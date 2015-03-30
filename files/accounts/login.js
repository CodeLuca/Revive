module.exports = function(app, bcrypt, db){
	app.post('/login', function(req, res){
		var user = req.body.username;
		var pass = req.body.password;

	    db.users.find({'username' : user}, function(err, docs) {
	    	if(typeof docs[0] !== 'undefined'){
	       		if(compare(pass, docs[0].password)){
	       			req.session.username = docs[0].username;
	       			console.log(docs[0].username + ' Logged in.');
	       			res.send(202);
	       		} else {
	       			console.log('Incorrect username or password')
	       			res.send('Incorrect username or password');
	       		}
       		} else {
				console.log('Incorrect username')
       			res.send('Incorrect username or password')
       		}
       	});

       	function compare(data, hash){
       		return bcrypt.compareSync(data, hash);
    	}
	});
};