var path = require('path');

module.exports = {
    entry: ['./public/javascripts/admin.js',
        './public/javascripts/members.js',
        './public/javascripts/socket.js',
    ],
    output: {
        filename: './bundle.js',
    }
};
