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
	promises.push(dataService.getTableReference(dataService.tableNames.meetups).expand('Location,Partners').find(meetupId).get());
	promises.push(appService.getMeetupRegistrationFormHtml(meetupId));
	promises.push(partialsService.renderHead(assets));
	promises.push(partialsService.renderHeader());
	promises.push(partialsService.renderFooter());
	promises.push(dataService.getTableReference(dataService.tableNames.agendaItems).orderBy('OrderN').expand('Topic,Speakers').filter('MeetupId eq ' + meetupId).get());

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
			meetup.AgendaItems = results[6].data;
			delete meetup['@odata.context'];

			meetup.Partners = meetup.Partners.sort(function(a, b) {
				if (a.Title > b.Title) {
					return 1;
				}
				if (a.Title < b.Title) {
					return -1;
				}
				return 0;
			});

			var dateBegin = new Date(meetup.DateTimeBegin);
			var dateEnd = new Date(meetup.DateTimeEnd);
			meetup.DateFormatted = dateBegin.getDate() + ' '
				+ translationService.getMonthName(dateBegin.getMonth()) + ' '
				+ dateBegin.getFullYear();
			meetup.TimeStartFormatted = (dateBegin.getUTCHours() + configService.timeZone) + ':'
				+ (dateBegin.getUTCMinutes() < 10 ? '0' + dateBegin.getUTCMinutes().toString(): dateBegin.getUTCMinutes());
			meetup.TimeEndFormatted = (dateEnd.getUTCHours() + configService.timeZone) + ':'
				+ (dateEnd.getUTCMinutes() < 10 ? '0' + dateEnd.getUTCMinutes().toString(): dateEnd.getUTCMinutes());

			var registrationFormHtml = results[2];

			var model = {
				page: {
					meetup: meetup,
					form: {
						registration: registrationFormHtml
					},
					configs: {
						GoogleMapsApiKey: configService.GoogleMapsApiKey
					}
				}
			};

			var html = Mustache.render(template, model, partials);

			return Promise.resolve({ name: meetup.Uri, html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;