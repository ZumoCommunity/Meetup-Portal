var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../../services/assets-service');
var helpersService = require('./../helpers-service');

var service = {};

service.render = function() {
	var promises = [];

	promises.push(helpersService.readLocalFile('templates/index.hjs'));

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var assets = assetsService
				.create()
				.addJQuery()
				.addBootstrap()
				.render();

			var model = {
				page: {
					title: 'Zumo Community'
				},
				assets: assets
			};

			var html = Mustache.render(template, model);

			return Promise.resolve(html);
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;