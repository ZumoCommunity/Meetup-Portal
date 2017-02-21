var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../../assets-service');
var helpersService = require('./../../helpers-service');
var dataService = require('./../../data-service');
var partialsService = require('./../_partials');
var translationService = require('./../../translation-service');

var service = {};

service.render = function() {
	var assets = assetsService
		.create()
		.addBootstrap()
		.addFontAwesome()
		.addJQueryUI()
		.render();

	var promises = [];

	promises.push(helpersService.readLocalFile('templates/meetups/list.hjs'));
	promises.push(partialsService.renderHead(assets));
	promises.push(partialsService.renderHeader());
	promises.push(partialsService.renderFooter());

	var years = (function() {
		var startYear = 2017;
		var currentYear = (new Date()).getUTCFullYear();

		var years = [];
		for (var year = startYear; year <= currentYear; year++) {
			years.push(year);
		}

		return years;
	})();

	for (var i = 0; i < years.length; i++) {
		var year = years[i];

		var table = dataService.getTableReference(dataService.tableNames.meetups);
		promises.push(table.expand('Location').orderBy('DateTimeBegin').filter('year(DateTimeBegin) eq ' + year).get());
	}
	promises.push(dataService.getTableReference(dataService.tableNames.agendaItems).orderBy('OrderN').expand('Topic,Speakers').get());

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var partials = {
				sectionHead: results[1],
				sectionHeader: results[2],
				sectionFooter: results[3]
			};

			years = years.map(function(year) {
				return { year: year  };
			});

			var agendaItems = results[4 + years.length].data;

			for (var i = 0; i < years.length; i++) {
				years[i].meetups = results[4 + i].data.map(function(meetup) {
					var date = new Date(meetup.DateTimeBegin);
					meetup.DateFormatted = date.getDate() + ' '
						+ translationService.getMonthName(date.getMonth()) + ' '
						+ date.getFullYear();
					meetup.AgendaItems = agendaItems.filter(function (agendaItem) {
						return agendaItem.MeetupId == meetup.Id;
					});
					meetup.IsPartner = meetup.MeetupOwnershipType == 3;

					return meetup;
				});
			}

			years.reverse();

			var model = {
				page: {
					years: years
				}
			};

			var html = Mustache.render(template, model, partials);

			return Promise.resolve({ name: 'meetups-list', html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;