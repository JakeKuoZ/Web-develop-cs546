//Here you will require route files and export them as used in previous labs
const peopleRoutes = require('./people');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/',peopleRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;