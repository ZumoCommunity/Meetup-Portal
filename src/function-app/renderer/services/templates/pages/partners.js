var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../../assets-service');
var helpersService = require('./../../helpers-service');
var dataService = require('./../../data-service');
var partialsService = require('./../_partials');

var service = {};

service.render = function(name) {
	var assets = assetsService
		.create()
		.addBootstrap()
		.addFontAwesome()
		.render();

	var promises = [];

	promises.push(helpersService.readLocalFile('templates/pages/partners.hjs'));
	promises.push(partialsService.renderHead(assets));
	promises.push(partialsService.renderHeader());
	promises.push(partialsService.renderFooter());
	promises.push(dataService.getTableReference(dataService.tableNames.partners).orderBy('Title').get());

	return Promise
		.all(promises)
		.then(function(results) {
			var template = results[0];

			var partials = {
				sectionHead: results[1],
				sectionHeader: results[2],
				sectionFooter: results[3]
			};

			var partners = results[4].data;

			var model = {
				page: {
					partners: partners
				}
			};

			var html = Mustache.render(template, model, partials);

			return Promise.resolve({ name: 'partners', html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;