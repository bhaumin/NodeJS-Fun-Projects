const request = require('request');
const parser = require('xml2json');

const goodReadsService = function() {

  const goodReadsApiKey = 'vCRbL7RQHSj7tpBkPbRJQ';

  const getBookMetaDataById = function(id, cb) {

    const url = `http://www.goodreads.com/book/show/${id}/?key=${goodReadsApiKey}`;

    request(url, function (error, response, body) {
      if (response && response.statusCode == 200) {
        const rawJsonData = parser.toJson(body);
        const data = JSON.parse(rawJsonData);

        cb(null, {image_url: data.GoodreadsResponse.book.image_url, description: data.GoodreadsResponse.book.description });
      } else {
        cb(error, null);
      }
    });

  };

  const getBookMetaDataMultiBooks = function(books, cb) {

    // Initialize this with all books first, and then remove as it is retrieved
    const booksRemaining = books.map((b, i) => {
      return {
        [i]: b.bookId
      };
    });

    // Not super proud of this implementation, but there is no better alternative in the current
    // scheme of things for this simple scope. Ideally, in order to scale, we would want to prefetch
    // all the books metadata via an offline batch task, so at runtime we are rendering it directly.
    books.forEach(function(book, i) {
      (function(j) {
        const url = `http://www.goodreads.com/book/show/${book.bookId}/?key=${goodReadsApiKey}`;
        request(url, function (error, response, body) {
          if (response && response.statusCode == 200) {
            const rawJsonData = parser.toJson(body);
            const data = JSON.parse(rawJsonData);
            const meta = {
              image_url: data.GoodreadsResponse.book.image_url,
              description: data.GoodreadsResponse.book.description
            };

            book.meta = meta;
          }

          // remove from booksRemaining dict
          delete booksRemaining[j];

          if (Object.keys(booksRemaining).length === 0) {
            cb(null, books);
          }
        });
      })(i);
    });

  };

  return {
    getBookMetaDataById: getBookMetaDataById,
    getBookMetaDataMultiBooks: getBookMetaDataMultiBooks,
  };

};

module.exports = goodReadsService;
