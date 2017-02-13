var Promise = require('promise');

var service = {};

service.render = function(name) {
    return Promise.resolve({ name: name, html: ''});
};

module.exports = service;