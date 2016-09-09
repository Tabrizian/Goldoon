var express = require('express');
var bodyParser = require('body-parser');
var GoldoonSchema = require('./models/goldoon');
var restful = require('node-restful');
var morgan = require('morgan');
var app = express();
var path = require('path');
var exphbs = require('express-handlebars');

var mongoose = restful.mongoose;

// node-restful requirements ...
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/goldoon');

var goldoon = restful.model('Goldoon', GoldoonSchema).methods(['get', 'post', 'put', 'delete']);

goldoon.register(app, '/goldoon');

app.get('/goldoons', function (req, res) {
    goldoon.find({}, function (err, goldoons) {
            res.render('home', goldoons);
        }
    );
});
app.listen(3000);
module.exports = app;
