module.exports = function(app, bcrypt, db) {
    app.get('/register', function(req, res) {
        if (req.session.username) {
            res.redirect('/dashboard');
            return;
        }
        var data = {
            err: ''
        }
        res.render('register', data);
    });

    app.post('/register', function(req, res) {
        var user = req.body.username;
        var pass = req.body.password;
        var newPass;

        db.users.find({
            'username': user
        }, function(err, docs) {
            if (docs[0]) {
                var data = {
                    err: 'This Username already exists!'
                }
                res.render('register', data);
            } else {
                create();
            }
        });

        function create() {
            var salt = bcrypt.genSaltSync(10);
            var newPass = bcrypt.hashSync(pass, salt);

            var obj = {
                'username': user,
                'password': newPass,
                'salt': salt
            }

            db.users.insert(obj, function() {
                console.log(user + ' Registered!');
                console.log(obj);
                var data = {
                    err: 'Your account was succesfully created'
                }
                res.render('login', data);
            });
        }
    });
};