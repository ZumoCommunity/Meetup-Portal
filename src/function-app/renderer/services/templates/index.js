var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../assets-service');
var helpersService = require('./../helpers-service');

var service = {};

service.render = function() {
	var promises = [];

	promises.push(helpersService.readLocalFile('templates/index.hjs'));

	return Promise
		.all(promises)
		.then(function(results){
			var template = results[0];

			var partners = [
				{ name: 'Microsoft Ukraine', webUrl: '' },
				{ name: 'DataArt', webUrl: '' },
				{ name: 'EPAM', webUrl: '' },
				{ name: 'Ciklum', webUrl: '' },
				{ name: 'GlobalLogic', webUrl: '' }
			];

			var events = [
				{ date: '2017-02-21', url: '' },
				{ date: '2017-03-14', url: '' },
				{ date: '2017-04-04', url: '' }
			];

			var speakers = [
				{ name: 'Anton Boyko', profileUrl: '' },
				{ name: 'Denis Reznik', profileUrl: '' },
				{ name: 'Alexandr Tkachenko', profileUrl: '' },
				{ name: 'Valentine Radchuk', profileUrl: '' }
			];

			var socials = [
				{ name: 'Facebook', url: '' },
				{ name: 'Twitter', url: '' },
				{ name: 'Google+', url: '' },
				{ name: 'YouTube', url: '' }
			];

			var assets = assetsService
				.create()
				.addJQuery()
				.addBootstrap()
				.addFontAwesome()
				.render();

			var model = {
				page: {
					title: 'Microsoft Azure Ukraine User Group',
					partners: partners,
					events: events,
					speakers: speakers,
					socials: socials
				},
				assets: assets
			};

			var html = Mustache.render(template, model);

			return Promise.resolve({ name: 'index', html: html });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;