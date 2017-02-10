var Mustache = require('mustache');
var Promise = require('promise');

var helpersService = require('./../helpers-service');

var service = {};

service.renderHead = function(assets) {
	var promises = [];

	promises.push(helpersService.readLocalFile('templates/_partials/html-head.hjs'));

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var model = {
				assets: assets || {}
			};

			var html = Mustache.render(template, model);

			return Promise.resolve(html);
		}, function (err) {
			return Promise.reject(err);
		});
};

service.renderHeader = function() {
	var promises = [];

	promises.push(helpersService.readLocalFile('templates/_partials/body-header.hjs'));

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var model = {
			};

			var html = Mustache.render(template, model);

			return Promise.resolve(html);
		}, function (err) {
			return Promise.reject(err);
		});
};

service.renderFooter = function() {
	var promises = [];

	promises.push(helpersService.readLocalFile('templates/_partials/body-footer.hjs'));

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var model = {
			};

			var html = Mustache.render(template, model);

			return Promise.resolve(html);
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;