const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

const router = function(mongoClient, dbName) {

  authRouter.route('/register')
    .post(function(req, res) {
      mongoClient.connect(function(err, client) {
        const user = {
          username: req.body.userName,
          password: req.body.password
        };

        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function() {
            res.redirect('/');
          });
        });
      });
    });

  authRouter.route('/login')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      res.redirect('/books');
    });

  authRouter.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all(function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.redirect('/');
      }
      next();
    })
    .get(function(req, res) {
      res.json(req.user);
    });

  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //
  //   res.redirect('/');
  // }

  return authRouter;
};

module.exports = router;
