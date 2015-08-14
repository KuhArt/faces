var express = require('express');
var router = express.Router();
var images = {
  eyes:['images/Eyes3.png','images/Eyes4.png'],
  noses:['images/Nose1.png','images/Nose2.png'],
  lips:['images/Lips3.png','images/Lips4.png'],
  hair:['images/Hair1.png','images/Hair2.png']
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', images:images });
});

module.exports = router;
