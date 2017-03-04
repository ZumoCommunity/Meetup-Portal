var Promise = require('promise');

var configService = require('./services/config-service');
var dataService = require('./services/data-service');
var taskService = require('./services/task-service');

module.exports = function (context, timer) {
	var registrationCloseThreshold = 12;

	var dateFrom = new Date();
	dateFrom.setHours(dateFrom.getHours() + configService.timeZone + registrationCloseThreshold - 1);

	var dateTo = new Date();
	dateTo.setHours(dateTo.getHours() + configService.timeZone + registrationCloseThreshold + 1);

	dataService
		.getTableReference(dataService.tableNames.meetups)
		.select('Id')
		.filter('DateTimeBegin ge ' + dateFrom.toISOString() + ' and DateTimeEnd le ' + dateTo.toISOString())
		.get()
		.then(function (result) {
			var meetups = result.data;

			var tasks = taskService
				.create();

			meetups.forEach(function (meetup) {
				tasks = tasks.renderMeetup(meetup.Id);
			});

			var lastRun = new Date(timer.ScheduleStatus.Last);
			lastRun.setHours(lastRun.getHours() + configService.timeZone);

			var currentTime = new Date();
			currentTime.setHours(currentTime.getHours() + configService.timeZone);

			if (lastRun.getDate() != currentTime.getDate()) {
				tasks = tasks.renderIndex();
			}

			context.bindings.rendererTasks = tasks.getTasks();
			context.done();
		})
};