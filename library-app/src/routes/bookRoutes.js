const express = require('express');
const bookRouter = express.Router();

const router = function(mongoClient, dbName, objectId, navs) {
  const bookService = require('../services/goodReadsService')();
  const bookController = require('../controllers/bookController')(mongoClient, dbName, objectId, navs, bookService);

  bookRouter.use(bookController.middleware);

  // Routes
  bookRouter.route('/')
    .get(bookController.getBooks);

  bookRouter.route('/:id')
    .get(bookController.getBookById);

  return bookRouter;
};

module.exports = router;
