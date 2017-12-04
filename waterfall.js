var http = require('http'),
    async = require('async');

async.waterfall([
    function(callback) {
        var body = '';
        http.get(process.argv[2], function(response) {
            response.on('data', function(chunk) {
                body += chunk.toString();
            });
            response.on('end', function() {
                callback(null, body);
            });
        }).on('error', function(err) {
            callback(err);
        });
    },
    
    function(body, callback) {
        var url = JSON.parse(body).url;
        var body = '';
        http.get(url, function(res) {
            res.on('data', f
        })
    }
])