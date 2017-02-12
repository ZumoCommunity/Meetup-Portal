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
	promises.push( dataService.getTableReference(dataService.tableNames.meetups).orderBy('DateTimeBegin').filter('DateTimeBegin ge ' + (new Date()).toISOString()).get());

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var partials = {
				sectionHead: results[1],
				sectionHeader: results[2],
				sectionFooter: results[3]
			};

			var partners = [
				{ name: 'Microsoft Ukraine', webUrl: '' },
				{ name: 'DataArt', webUrl: '' },
				{ name: 'EPAM', webUrl: '' },
				{ name: 'Ciklum', webUrl: '' },
				{ name: 'GlobalLogic', webUrl: '' }
			];

			var upcomingMeetups = results[4].data.map(function(meetup) {
				var date = new Date(meetup.DateTimeBegin);
				meetup.DateFormatted = date.getDay() + ' '
					+ translationService.getMonthName(date.getMonth()) + ' '
					+ date.getFullYear();

				return meetup;
			});

			var speakers = [
				{ name: 'Anton Boyko', profileUrl: '' },
				{ name: 'Denis Reznik', profileUrl: '' },
				{ name: 'Alexandr Tkachenko', profileUrl: '' },
				{ name: 'Valentine Radchuk', profileUrl: '' }
			];

			var socials = [
				{ name: 'Facebook', url: '', fa: 'fa-facebook-official' },
				{ name: 'Twitter', url: '', fa: 'fa-twitter-square' },
				{ name: 'Google+', url: '', fa: 'fa-google-plus-square' },
				{ name: 'YouTube', url: '', fa: 'fa-youtube-square' }
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