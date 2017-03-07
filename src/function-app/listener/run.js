var loggingService = require('./services/logging-service');

var taskService = require('./services/task-service');
var dataService = require('./services/data-service');
var Promise = require('promise');

module.exports = function (context, eventItem) {
	loggingService.trackEvent("listener receives item", eventItem);
	if (eventItem.action == 'init') {
		var promises = [];
		promises.push(dataService.getTableReference(dataService.tableNames.meetups).select('Id').get());

		Promise.all(promises)
			.then(function (results) {
				var tasks = taskService
					.create()
					.renderIndex()
					.renderSpeakers()
					.renderPartners()
					.renderMeetupsList();

				var meetups = results[0].data;
				meetups.forEach(function (meetup) {
					tasks = tasks.renderMeetup(meetup.Id);
				});

				context.bindings.rendererTasks = tasks.getTasks();
				context.done();
			});
	} else {
		context.done();
	}
};