
var bookController = function(mongodb, connStr, objectId, navs, bookService) {

  var middleware = function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //   res.redirect('/');
    // }
    next();
  };

  var getBooks = function(req, res) {
    mongodb.connect(connStr, function(err, db) {
      var collection = db.collection('books');
      collection.find({}).toArray(function(err, results) {

        bookService.getBookMetaDataMultiBooks(results, function(err, resultsWithMeta) {
          if (err) {
            resultsWithMeta = results;
          }

          res.render('bookListView', {
            title: 'Library: Books',
            nav: navs,
            isLoggedIn: req.isAuthenticated(),
            user: req.isAuthenticated() ? req.user : '',
            books: resultsWithMeta,
          });
        });

        db.close();
      });
    });
  };

  var getBookById = function(req, res) {
    var id = new objectId(req.params.id);
    mongodb.connect(connStr, function(err, db) {
      var collection = db.collection('books');
      collection.findOne({_id: id}, function(err, result) {

        bookService.getBookMetaDataById(result.bookId, function(err, meta) {
          if (!err) {
            result.meta = meta;
          }

          res.render('bookView', {
            title: 'Book: ' + result.title,
            nav: navs,
            isLoggedIn: req.isAuthenticated(),
            user: req.isAuthenticated() ? req.user : '',
            book: result,
          });
        });

        db.close();
      });
    });
  };

  return {
    middleware: middleware,
    getBooks: getBooks,
    getBookById: getBookById,
  };

};

module.exports = bookController;
