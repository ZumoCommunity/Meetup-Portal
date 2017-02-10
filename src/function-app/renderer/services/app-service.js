var http = require('http');
var url = require('url');

var configService = require('./config-service');
var Promise = require('promise');

var service = {};

var meetupRegistrationFormId = '898112fa-5aa1-4c25-8f42-ffae4cc8712b';
var defaultLanguage = 'en-US';

service.getMeetupRegistrationFormHtml = function(meetupId) {
	return new Promise(function(resolve, reject) {
		var data = JSON.stringify([
			{
				key: 'meetupId',
				value: meetupId
			}
		]);

		var apiUrl = url.parse(configService.applicationApiEndpoint);

		var options = {
			hostname: apiUrl.hostname,
			port: apiUrl.port,
			protocol: apiUrl.protocol,
			method: 'POST',
			path: apiUrl.path + '/forms/' + meetupRegistrationFormId + '/render/' + defaultLanguage,
			headers: {
				'Content-Type': 'application/json'
			}
		};

		var request = http.request(options, function(response) {
			var formHtml = '';

			response.setEncoding('utf8');

			response.on('data', function(chunk) {
				formHtml += chunk;
			});

			response.on('end', function () {
				resolve(formHtml);
			});
		});

		request.on('error', function(err) {
			reject(err);
		});

		request.write(data);
		request.end();
	});
};

module.exports = service;