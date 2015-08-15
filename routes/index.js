var express = require('express');
var imgs = require('../models/images');
var router = express.Router();

/*
Test data
var images = {
  eyes:['images/Eyes3.png','images/Eyes4.png'],
  noses:['images/Nose1.png','images/Nose2.png'],
  lips:['images/Lips3.png','images/Lips4.png'],
  hair:['images/Hair1.png','images/Hair2.png']
};*/


/* GET home page. */
router.get('/', function(req, res, next) {
  imgs.find(function (err, data) {
    var images = {};
    for(var i = 0; i < data.length; i+=1){
      images[data[i].type] = images[data[i].type] || [];
      images[data[i].type].push(data[i].path);
    }
    console.log(images);
    res.render('index', { title: 'Express', images:images });
  })
});

module.exports = router;
