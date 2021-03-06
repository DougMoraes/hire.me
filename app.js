var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var encode = require('./encode.js');
var Url = require('./models/url');

mongoose.connect(config.db.host);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function (req, res) {
  var longUrl = req.body.url;
  var shortUrl = req.body.alias;

  Url.findOne({ long_url: longUrl }, function (err, doc) {
    if (doc) {
      res.send({ 'shortUrl': doc.short_url });

    } else {
      var newUrl = Url({
        long_url: longUrl,
        short_url: shortUrl
      });

      if (shortUrl == "" || shortUrl == undefined) {
        newUrl.short_url = encode.encode(Math.random() * 1000);
        
        newUrl.save(function (err) {
          if (err) {
            console.log(err);

          }
  
          res.send({
            'shortUrl': newUrl.short_url
          
          });
        });
      } else {
        Url.findOne({ short_url: shortUrl }, function (err, doc) {
          if (doc) {
            var erro = {
              alias: shortUrl,
              err_code: "001",
              description: "CUSTOM ALIAS ALREADY EXISTS"
            };

            res.send(erro);
          } else {
            newUrl.short_url = shortUrl
            newUrl.save(function (err) {
        
              if (err) {
                console.log(err);
              }
      
              res.send({
                'shortUrl': newUrl.short_url
              });
            });
          }
        })
        
      }
    }
  });
});

app.get('/:encoded_id', function (req, res) {

  var shortUrl = req.params.encoded_id;

  Url.findOne({ short_url: shortUrl }, function (err, doc) {
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
});

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});