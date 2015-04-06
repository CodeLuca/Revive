module.exports = function(app, bcrypt, db) {
    app.get('/login', function(req, res) {
        var data = {
            err: ''
        }
        res.render('login', data);
    });

    app.post('/login', function(req, res) {
        var user = req.body.username;
        var pass = req.body.password;

        db.users.find({
            'username': user
        }, function(err, docs) {
            if (typeof docs[0] !== 'undefined') {
                if (compare(pass, docs[0].password)) {
                    req.session.username = user;
                    console.log(req.session.username);
                    console.log(docs[0].username + ' Logged in.');
                    res.redirect('/');
                } else {
                    var data = {
                        err: 'Error! Incorrect username or password'
                    }
                    res.render('login', data);
                }
            } else {
                var data = {
                    err: 'Error! Incorrect username or password'
                }
                res.render('login', data);
            }
        });

        function compare(data, hash) {
            return bcrypt.compareSync(data, hash);
        }
    });
};