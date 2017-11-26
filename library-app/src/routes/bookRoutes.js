var express = require('express');
var bookRouter = express.Router();

var router = function(mongodb, connStr, objectId, navs) {
  var bookService = require('../services/goodReadsService')();
  var bookController = require('../controllers/bookController')(mongodb, connStr, objectId, navs, bookService);

  bookRouter.use(bookController.middleware);

  // Routes
  bookRouter.route('/')
    .get(bookController.getBooks);

  bookRouter.route('/:id')
    .get(bookController.getBookById);

  return bookRouter;
};

module.exports = router;
