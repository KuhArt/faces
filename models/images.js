/**
 * Created by artkuh on 15.8.15.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://faces:14657759139@ds035713.mongolab.com:35713/faces');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
    var imgSchema = mongoose.Schema({
        type: String,
        path: String
    });
var resSchema = mongoose.Schema({
    eyes: String,
    nose: String,
    lips: String,
    hair: String
});
exports.Results = mongoose.model("Results", resSchema,'results');
exports.Image = mongoose.model('Image',imgSchema);


