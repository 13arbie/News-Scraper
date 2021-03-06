const express = require('express'),
      exphbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),


const PORT = process.env.PORT || 3000;
let app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended:true }))
    .use(bodyParser.text())
    .use(bodyParser.json({ type: 'application/vnd.api+json' }))
    .use(methodOverride('_method'))
    .use(logger('dev'))
    .use(express.static(__dirname + '/public'))
    .engine('handlebars', exphbs({ defaultLayout: 'main' }))
    .set('view engine', 'handlebars')
    .use(require('./controllers'));

mongoose.Promise = Promise;

mongoose.connect(dbURI);
const db = mongoose.connection;
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
    app.listen(PORT, function() {
        console.log("App running on port" + PORT);
    });
});

module.exports = app;