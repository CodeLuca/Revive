module.exports = function(app, bcrypt, db){
	app.post('/register', function(req, res){
		var user = req.body.username;
		var pass = req.body.password;
		var newPass;

		var salt = bcrypt.genSaltSync(10);
		var newPass = bcrypt.hashSync(pass, salt);

		var obj = {'username': user, 'password': newPass, 'salt' : salt}
	    
	    db.users.insert(obj, function(){
			console.log(user + ' Registered!');
			console.log(obj);
	    });
	});
};