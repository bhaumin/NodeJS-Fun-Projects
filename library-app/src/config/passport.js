var passport = require('passport');

module.exports = function(app, mongodb, connStr) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  require('./strategies/local.strategy')(mongodb, connStr, passport);
};
