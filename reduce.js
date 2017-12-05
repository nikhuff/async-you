var http = require('http'),
    async = require('async');

var url = process.argv[2],
    number = ['one', 'two', 'three'];

async.reduce(number, 0, function(memo, item, callback) {
    http.get(url + "?number=" + item, function(res) {
        var body = '';
        res.on('data', function(block) {
            body += block;
        });
        res.on('end', function() {
           callback(null, +body + memo); 
        });
    }).on('error', callback);
}, function(err, result) {
    if (err) return console.error(err); 
    console.log(result);
});