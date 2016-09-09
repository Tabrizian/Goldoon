var express = require('express');
var bodyParser = require('body-parser');
var GoldoonSchema = require('./models/goldoon');
var restful = require('node-restful');
var morgan = require('morgan');
var app = express();
var path = require('path');
var exphbs = require('express-handlebars');


var mongoose = restful.mongoose;

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


// node-restful requirements ...
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));



mongoose.connect('mongodb://localhost/goldoon');

var goldoon = app.resource = restful.model('Goldoon', GoldoonSchema).
    methods(['get', 'post', 'put', 'delete']);

goldoon.register(app, '/goldoon');

app.get('/goldoons', function(req, res) {
    //goldoon.find({}, function(err, goldoons) {
        res.render('home', {
            body: 'John'
        //});
    });
});

app.listen(3000);
module.exports = app;
