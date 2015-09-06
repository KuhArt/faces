var express = require('express');
var imgs = require('../models/images');
//var results = require('../models/results');
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
router.get('/', function (req, res, next) {
    imgs.Image.find(function (err, data) {
        if (err) return next(err);
        var images = {};
        for (var i = 0; i < data.length; i += 1) {
            images[data[i].type] = images[data[i].type] || [];
            images[data[i].type].push(data[i].path);
        }
        var query = imgs.Results.find({});
        query
            .limit(3)
            .skip(2)
            .exec(function (err, data) {
           //     console.log(data);
                var results = [];
                for (var i = 0; i < data.length; i += 1) {
                    var values = [];
                    for (var key in data[i]._doc) {
                        if (data[i]._doc.hasOwnProperty(key)) {
                            values.push(data[i][key]);
                      //      console.log("KEY:",key," VAL",data[i][key]);
                        }
                    }
                    results.push(values);
                }
                console.log(results);
                //   console.log(results);
                res.render('index', {title: 'Express', images: images, resul: results});
            });

     //   console.log(images);

    })
});


router.get('/result', function (req, res, next) {
    if (req.xhr) {

    }
    res.redirect('/');

});
module.exports = router;
