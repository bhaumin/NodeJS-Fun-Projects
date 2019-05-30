const LocalStrategy = require('passport-local').Strategy;

module.exports = function(mongoClient, dbName, passport) {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  },
  function(username, password, done) {
    mongoClient.connect(function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection('users');
      collection.findOne({
        username: username
      }, function(err, result) {
        console.log(result);
        if (result.password === password) {
          const user = result;
          done(null, user);
        } else {
          done(null, false, { message: 'Bad Password' });
        }
      });
    });
  }));
};
