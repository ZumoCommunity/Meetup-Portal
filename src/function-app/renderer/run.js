var templatesService = require('./services/templates-service');
var helpersService = require('./services/helpers-service');

var service = {};

module.exports = function (context, queueItem) {
	templatesService
		.render(queueItem.page, queueItem.arguments)
		.then(function(result) {
			helpersService
				.saveHtml(result.name, result.html)
				.then(function() {
					context.done();
				}, function (err) {
					console.log(err);
					context.done();
				});
		}, function(err) {
			console.log(err);
			context.done();
		});
};