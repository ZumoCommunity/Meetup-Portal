var Mustache = require('mustache');
var Promise = require('promise');

var assetsService = require('./../assets-service');
var helpersService = require('./../helpers-service');
var partialsService = require('./_partials');

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
				{ name: 'Facebook', url: '', fa: 'fa-facebook-official' },
				{ name: 'Twitter', url: '', fa: 'fa-twitter-square' },
				{ name: 'Google+', url: '', fa: 'fa-google-plus-square' },
				{ name: 'YouTube', url: '', fa: 'fa-youtube-square' }
			];

			var model = {
				page: {
					partners: partners,
					events: events,
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