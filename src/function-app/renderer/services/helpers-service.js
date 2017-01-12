var fs = require('fs');
var path = require('path');

var service = {};

service.readLocalFile = function(localPath) {
	var fullPath = path.join(__dirname, './../', localPath);

	return new Promise(function (resolve, reject) {
		fs.readFile(fullPath, 'utf8', function(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

module.exports = service;