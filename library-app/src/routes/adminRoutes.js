const express = require('express');
const adminRouter = express.Router();

const router = function(mongoClient, dbName) {

  const navs = [
    {
      link: '/books',
      text: 'Books'
    },
    {
      link: '/authors',
      text: 'Authors'
    }
  ];

  const books = [
    {
      title : 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Leo Tolstoy',
      bookId: 656,
      read: false
    },
    {
      title: 'Les Miserables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      bookId: 24280,
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      bookId: 2493,
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      bookId: 32829,
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      bookId: 1881716,
      read: false,
    }
  ];

  // Routes
  adminRouter.route('/addNavs')
    .get(function(req, res) {
      mongoClient.connect(function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('navs');
        collection.insertMany(navs, function(err, results) {
          res.send(results);
        });
      });
    });

  adminRouter.route('/addBooks')
    .get(function(req, res) {
      mongoClient.connect(function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
        });
      });
    });

  return adminRouter;
};

module.exports = router;
