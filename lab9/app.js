/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the array sort page.
*/

const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');


const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
  };
  
  app.use;
  app.use('/public', static);
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(rewriteUnsupportedBrowserMethods);
  
  configRoutes(app);
  
  app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });