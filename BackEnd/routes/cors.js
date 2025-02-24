const cors = require('cors');

const whitelist = ['http://localhost:3000'];

var corsOptionsDelegate = (req, callback) => {
    console.log('Origin:', req.header('Origin'));
    var corsOption;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOption = {
            origin: true
        };
    } else {
        corsOption = {
            origin: false
        };
    }
    callback(null, corsOption);
};

exports.cors = cors();

exports.corsWithOptions = cors(corsOptionsDelegate);