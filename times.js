var http = require('http'),
    async = require('async');

var url = 'http://' + process.argv[2] + ':' + process.argv[3];

function addUser(id, next) {

    var options = {
        hostname: process.argv[2],
        port: process.argv[3],
        path: '/users/create',
        method: 'POST'
    };

    var data = JSON.stringify({
        "user_id": id
    });
    var request = http.request(options, function (res) {
        res.on('data', function () {});
        res.on('end', function () {
            next();
        });
    });

    request.on('error', next);

    request.write(data);
    request.end();
}

async.series({
    post: function (done) {
        async.times(5, function (n, next) {
            addUser(n + 1, function (err) {
                next(err);
            });
        }, function () {
            done(null, "finished");
        });
    },

    get: function (done) {
        http.get(url + '/users', function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk.toString();
            });
            res.on('end', function () {
                done(null, body);
            });
        }).on('error', done);
    }
}, function (err, results) {
    if (err) console.error(err);
    console.log(results.get);
});
