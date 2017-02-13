var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../../assets-service');
var helpersService = require('./../../helpers-service');
var dataService = require('./../../data-service');
var appService = require('./../../app-service');
var partialsService = require('./../_partials');
var configService = require('./../../config-service');
var translationService = require('./../../translation-service');

var service = {};

service.render = function(meetupId) {
	var assets = assetsService
		.create()
		.addBootstrap()
		.addFontAwesome()
		.addJQuery()
		.addKnockout()
		.addLoader()
		.render();

	var promises = [];

	promises.push(helpersService.readLocalFile('templates/meetups/entity.hjs'));
	promises.push(dataService.getTableReference(dataService.tableNames.meetups).expand('Location').find(meetupId).get());
	promises.push(appService.getMeetupRegistrationFormHtml(meetupId));
	promises.push(partialsService.renderHead(assets));
	promises.push(partialsService.renderHeader());
	promises.push(partialsService.renderFooter());

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var partials = {
				sectionHead: results[3],
				sectionHeader: results[4],
				sectionFooter: results[5]
			};

			var meetup = results[1].data;
			delete meetup['@odata.context'];

			var dateBegin = new Date(meetup.DateTimeBegin);
			var dateEnd = new Date(meetup.DateTimeEnd);
			meetup.DateFormatted = dateBegin.getDay() + ' '
				+ translationService.getMonthName(dateBegin.getMonth()) + ' '
				+ dateBegin.getFullYear();
			meetup.TimeStartFormatted = (dateBegin.getUTCHours() + configService.timeZone) + ':'
				+ dateBegin.getUTCMinutes();
			meetup.TimeEndFormatted = (dateEnd.getUTCHours() + configService.timeZone) + ':'
				+ dateEnd.getUTCMinutes();


			var registrationFormHtml = results[2];

			var model = {
				page: {
					meetup: meetup,
					form: {
						registration: registrationFormHtml
					}
				}
			};

			var html = Mustache.render(template, model, partials);

			return Promise.resolve({ name: meetup.Url, html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;