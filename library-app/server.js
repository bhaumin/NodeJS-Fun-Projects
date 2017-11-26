var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var session = require('express-session');
var connStr = 'mongodb://localhost:27017/libraryApp';

mongodb.connect(connStr, function(err, db) {
  var collection = db.collection('navs');
  collection.find({}).toArray(function(err, results) {
    initRoutes(results);
    db.close();
  });
});

function initRoutes(navs) {
  var bookRouter = require('./src/routes/bookRoutes')(mongodb, connStr, objectId, navs);
  var adminRouter = require('./src/routes/adminRoutes')(mongodb, connStr);
  var authRouter = require('./src/routes/authRoutes')(mongodb, connStr);

  app.use('/books', bookRouter);
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);

  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Library Home',
      nav: navs,
      isLoggedIn: req.isAuthenticated(),
      user: req.isAuthenticated() ? req.user : ''
    });
  });
}

var app = express();
var port = 3000;

app.use(express.static('public/dist'));
// app.use(express.static('src/views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'library', resave: false, saveUninitialized: false}));

require('./src/config/passport')(app, mongodb, connStr);

app.set('views', './src/views');
app.set('view engine', 'jade');

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
