const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const session = require('express-session');
const connStr = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

const client = new MongoClient(connStr, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function(err, client) {
  const db = client.db(dbName);
  const collection = db.collection('navs');

  collection.find({}).toArray(function(err, results) {
    initRoutes(results);
  });
});


function initRoutes(navs) {
  const bookRouter = require('./src/routes/bookRoutes')(client, dbName, objectId, navs);
  const adminRouter = require('./src/routes/adminRoutes')(client, dbName);
  const authRouter = require('./src/routes/authRoutes')(client, dbName);

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

const app = express();
const port = 3000;

app.use(express.static('public/dist'));
// app.use(express.static('src/views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'library', resave: false, saveUninitialized: false}));

require('./src/config/passport')(app, client, dbName);

app.set('views', './src/views');
app.set('view engine', 'pug');

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
