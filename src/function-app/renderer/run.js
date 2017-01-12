var templatesService = require('./services/templates-service');

var service = {};

module.exports = function (context, queueItem) {
	context.log('queue item: ', queueItem);

	context.log('page: ', queueItem.page);

	templatesService
		.render(queueItem.page, queueItem.arguments)
		.then(function(html) {
			console.log(html);
			context.done();
		}, function(err) {
			console.log(err);
			context.done();
		});
};