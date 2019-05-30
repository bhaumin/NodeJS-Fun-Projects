const bookController = function(mongoClient, dbName, objectId, navs, bookService) {

  const middleware = function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //   res.redirect('/');
    // }
    next();
  };

  const getBooks = function(req, res) {
    mongoClient.connect(function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection('books');
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
      });
    });
  };

  const getBookById = function(req, res) {
    const id = new objectId(req.params.id);
    mongoClient.connect(function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection('books');
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
