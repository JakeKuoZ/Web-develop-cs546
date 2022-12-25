// Setup server, session and middleware here.
const express = require('express');
const configRoutes = require('./routes');
const {
    dbConnection
} = require("./config/mongoConnection");
const session = require("express-session");
const {
    engine
} = require("express-handlebars");

const app = express();
dbConnection();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    const {
        username
    } = req.session;
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${username ? '(Authenticated User' : 'Non-Authenticated User'})`)
    next();
})
configRoutes(app);//app.use('/', routes);
app.listen(3000, async () => {
    // console.log("user_collection = ", await (await user_collection()).find({}).toArray())
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});