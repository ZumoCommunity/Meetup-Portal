var Promise = require('promise');
var minify = require('html-minifier').minify;

function getMinifiedHtml(html){
	return minify(html, {
		removeComments: true,
		collapseWhitespace: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true
	});
}

var templates = {
	meetups: {}
};

templates.index = require('./templates/index');
templates.meetups.list = require('./templates/meetups/list');
templates.meetups.entity = require('./templates/meetups/entity');

var service = {};

service.render = function(page, arguments) {
	var renderPromise;

	switch (page) {
		case 'index':
			renderPromise = templates.index.render();
			break;
		case 'meetups-list':
			renderPromise = templates.meetups.list.render(arguments.year);
			break;
		case 'meetup-entity':
			renderPromise = templates.meetups.entity.render(arguments.meetupId);
			break;
		default:
			throw new Error('Page type is not supported.');
	}

	return renderPromise
		.then(function (html) {
			var minifiedHtml = getMinifiedHtml(html);
			return Promise.resolve(minifiedHtml);
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;