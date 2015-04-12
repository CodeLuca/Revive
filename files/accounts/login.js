module.exports = function(app, bcrypt, db) {
    app.get('/login', function(req, res) {
        if (req.session.username) {
            res.redirect('/dashboard');
            return;
        }
        res.render('login');
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
`                    res.redirect('/dashboard');
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