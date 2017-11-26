var LocalStrategy = require('passport-local').Strategy;

module.exports = function(mongodb, connStr, passport) {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  },
  function(username, password, done) {
    mongodb.connect(connStr, function(err, db) {
      var collection = db.collection('users');
      collection.findOne({
        username: username
      },
      function(err, results) {
        if (results.password === password) {
          var user = results;
          done(null, user);
        } else {
          done(null, false, { message: 'Bad Password' });
        }

        db.close();
      });
    });
  }));
};
