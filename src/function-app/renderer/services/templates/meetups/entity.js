var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../../assets-service');
var helpersService = require('./../../helpers-service');
var dataService = require('./../../data-service');
var appService = require('./../../app-service');

var service = {};

service.render = function(meetupId) {
	var promises = [];

	promises.push(helpersService.readLocalFile('templates/meetups/entity.hjs'));
	promises.push(dataService.getTableReference(dataService.tableNames.meetups).expand('Location').find(meetupId).get());
	promises.push(appService.getMeetupRegistrationFormHtml(meetupId));

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var meetup = results[1].data;
			delete meetup['@odata.context'];

			var registrationFormHtml = results[2];

			var assets = assetsService
				.create()
				.addJQuery()
				.addBootstrap()
				.addFontAwesome()
				.addKnockout()
				.render();

			var model = {
				page: {
					meetup: meetup,
					form: {
						registration: registrationFormHtml
					}
				},
				assets: assets
			};

			var html = Mustache.render(template, model);

			return Promise.resolve({ name: 'meetup-' + meetupId, html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;