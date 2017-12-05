var http = require('http'),
    async = require('async');

var url = process.argv[2];

var responseString = '',
    count = 0;

async.whilst(
    function () {
        return responseString != 'meerkat';
    },
    getRequest,
    function (err) {
        if (err) console.log(err);
        console.log(count);
    });

function getRequest(done) {
    body = '';
    count++;
    http.get(url, function (res) {
        res.on('data', function (block) {
            body += block;
        });
        res.on('end', function () {
            responseString = body;
            done(null, count);
        });
    }).on('error', done);
}