var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../assets-service');
var helpersService = require('./../helpers-service');
var partialsService = require('./_partials');
var dataService = require('./../data-service');
var translationService = require('./../translation-service');

var service = {};

service.render = function() {
	var assets = assetsService
		.create()
		.addBootstrap()
		.addFontAwesome()
		.render();

	var promises = [];

	promises.push(helpersService.readLocalFile('templates/index.hjs'));
	promises.push(partialsService.renderHead(assets));
	promises.push(partialsService.renderHeader());
	promises.push(partialsService.renderFooter());
	promises.push(dataService.getTableReference(dataService.tableNames.meetups).expand('Location').orderBy('DateTimeBegin').filter('DateTimeBegin ge ' + (new Date()).toISOString()).get());
	promises.push(dataService.getTableReference(dataService.tableNames.partners).orderBy('Title').get());
	promises.push(dataService.getTableReference(dataService.tableNames.agendaItems).expand('Topic,Speakers').orderBy('Meetup/DateTimeBegin').filter('Meetup/DateTimeBegin ge ' + (new Date()).toISOString()).get());

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var partials = {
				sectionHead: results[1],
				sectionHeader: results[2],
				sectionFooter: results[3]
			};

			var upcomingMeetups = results[4].data.map(function(meetup) {
				var date = new Date(meetup.DateTimeBegin);
				meetup.DateFormatted = date.getDate() + ' '
					+ translationService.getMonthName(date.getMonth()) + ' '
					+ date.getFullYear();

				return meetup;
			});

			var partners = results[5].data;

			var agendaItems = results[6].data;

			upcomingMeetups = upcomingMeetups.map(function(meetup) {
				meetup.AgendaItems = agendaItems.filter(function (agendaItem) {
					return agendaItem.MeetupId == meetup.Id;
				});
				return meetup;
			});

			var speakers = agendaItems.reduce(function(speakersArray, agendaItem) {
				for (var i = 0; i < agendaItem.Speakers.length; i++) {
					var isSpeakerExists = speakersArray.filter(function (speaker) {
						return speaker.Id == agendaItem.Speakers[i].Id;
					}).length != 0;

					if (!isSpeakerExists) {
						speakersArray.push(agendaItem.Speakers[i]);
					}
				}
				return speakersArray;
			}, []);

			var socials = [
				{ name: 'Facebook', url: 'https://www.facebook.com/groups/azure.ua/', fa: 'fa-facebook-official' }
			];

			var model = {
				page: {
					partners: partners,
					upcomingMeetups: upcomingMeetups,
					speakers: speakers,
					socials: socials
				}
			};

			var html = Mustache.render(template, model, partials);

			return Promise.resolve({ name: 'index', html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;