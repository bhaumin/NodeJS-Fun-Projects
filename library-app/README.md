# Library App
A simple server side web application developed using NodeJS, Express, Pug and MongoDB.

## Requirements
* Node.js
* npm

## How to run
* `npm install` to install dependencies
* Build the frontend dist using webpack with `npm run build` or `npm run watch`
* Start the web server with `npm start`. Default port = 3000.
* Open `http://localhost:3000/` in your favorite browser

## Implementation Notes - Framework/tools used
* Routes (get/post)
* Data driven UI enabled by [Pug](http://pugjs.org/) templating engine
* Login / Logout (local authentication)
* Route level authorization
* State saved persistently in MongoDB, using the native MongoDB [driver](https://www.npmjs.com/package/mongodb)
* [Font Awesome](http://fontawesome.io/)
* All packaging cleanly handled using [npm](https://www.npmjs.com/) and [webpack](https://webpack.github.io/). No Grunt/Gulp/Bower!

## 3rd Party
Using the [www.goodreads.com](https://www.goodreads.com/api)'s API to display book's metadata
