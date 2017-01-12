var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');

var configService = require('./config-service');

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

service.saveHtml = function(fileName, fileContent) {
	var data = JSON.stringify({ fileName: fileName, fileContent: fileContent });

	var urlData = url.parse(configService.saveFileApi);

	var options = {
		protocol: urlData.protocol,
		hostname: urlData.hostname,
		port: urlData.port,
		path: urlData.path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	return new Promise(function(resolve, reject) {
		var request = http.request(options, function(response) {
			if (response.statusCode == 200) {
				resolve();
			} else {
				reject('Http error code ' + response.statusCode);
			}
		});

		request.on('error', function(err) {
			reject(err);
		});

		request.write(data);
		request.end();
	});
};

module.exports = service;