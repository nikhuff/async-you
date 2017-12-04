var http = require('http'),
    async = require('async'),
    fs = require('fs');

async.waterfall([
    function (callback) {
        fs.readFile(process.argv[2], function doneReading(err, fileContents) {
            var body = fileContents.toString();
            callback(null, body);
        })
    },

    function (body, callback) {
        var url = body;
        var body = '';
        http.get(url, function (res) {
            res.on('data', function (chunk) {
                body += chunk.toString();
            });
            res.on('end', function () {
                callback(null, body);
            });
        }).on('error', function (err) {
            callback(err);
        });
    }
], function (err, result) {
    if (err) return console.error(result);
    console.log(result);
});