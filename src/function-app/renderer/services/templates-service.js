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
	meetups: {},
	pages: {}
};

templates.index = require('./templates/index');
templates.meetups.list = require('./templates/meetups/list');
templates.meetups.entity = require('./templates/meetups/entity');
templates.pages.partners = require('./templates/pages/partners');

var service = {};

service.render = function(page, arguments) {
	var renderPromise;

	switch (page) {
		case 'index':
			renderPromise = templates.index.render();
			break;
		case 'meetups-list':
			renderPromise = templates.meetups.list.render();
			break;
		case 'meetup-entity':
			renderPromise = templates.meetups.entity.render(arguments.meetupId);
			break;
		case 'partners':
			renderPromise = templates.pages.partners.render();
			break;
		default:
			throw new Error('Page type "' + page + '" is not supported.');
	}

	return renderPromise
		.then(function (result) {
			var minifiedHtml = result.html;
			// var minifiedHtml = getMinifiedHtml(result.html);
			return Promise.resolve({ name: result.name, html: minifiedHtml });
		}, function (err) {
			return Promise.reject(err);
		});
};

module.exports = service;