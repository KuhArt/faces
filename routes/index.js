var express = require('express');
var imgs = require('../models/images');
var fs = require('fs');
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
            .skip(Math.floor(Math.random() * 6))
            .exec(function (err, data) {
                var results = [];
                for (var i = 0; i < data.length; i += 1) {
                    var values = [];
                    for (var key in data[i]._doc) {
                        if (data[i]._doc.hasOwnProperty(key)) {
                            if( key != '_id') {
                                values.push(data[i][key]);
                            }
                        }
                    }
                    results.push(values);
                }
                res.render('index', {title: 'Express', images: images, resul: results});
            });


    })
});


router.post('/result', function (req, res, next) {
    if(req.xhr) {
        var data = req.body.merge,
            regex = /^data:.+\/(.+);base64,(.*)$/,
            matches = data.match(regex),
            ext = matches[1],
            image = matches[2],
            buffer = new Buffer(image, 'base64');
        var pathAr = __dirname.split('/');
        pathAr.pop();
        var path = pathAr.join('/') + '/public';
        var relPath = '/images/data.' + ext;
        fs.writeFileSync(path + relPath, buffer);
        res.send(relPath);
    }
});
module.exports = router;
