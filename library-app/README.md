# Library App
A simple server side web application developed using NodeJS, Express, Jade and MongoDB.

## Requirements
* Node.js
* npm

## How to run
* `npm install` to install dependencies
* Build the frontend dist using webpack with `npm run build` or `npm run watch`
* Start the web server with `npm start`. Default port = 3000.
* Open `http://localhost:3000/` in your favorite browser

## Key Features
* Routes (get/post)
* Data driven UI enabled by [Jade](http://jade-lang.com/) templating engine
* Login / Logout (local authentication)
* Route level authorization
* State saved persistently in MongoDB, using the native MongoDB [driver](https://www.npmjs.com/package/mongodb)
* All packaging cleanly handled using [npm](https://www.npmjs.com/) and [webpack](https://webpack.github.io/). Good Bye Grunt/Gulp/Bower!
* And, last but not the least, how awesome is [Font Awesome](http://fontawesome.io/)?

## 3rd Party
Using the [www.goodreads.com](https://www.goodreads.com/api)'s API to display book's metadata
