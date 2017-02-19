function createRenderTask(page, arguments) {
	var task = {
		page: page
	};

	if (!!arguments) {
		task.arguments = arguments
	}

	return task;
}

var tasks = function() {
	this.tasks = [];
};

tasks.prototype.renderIndex = function() {
	this.tasks.push(createRenderTask('index'));
	return this;
};

tasks.prototype.renderSpeakers = function() {
	this.tasks.push(createRenderTask('speakers'));
	return this;
};

tasks.prototype.renderPartners = function() {
	this.tasks.push(createRenderTask('partners'));
	return this;
};

tasks.prototype.renderMeetupsList = function() {
	this.tasks.push(createRenderTask('meetups-list'));
	return this;
};

tasks.prototype.renderMeetup = function(meetupId) {
	this.tasks.push(createRenderTask('meetup-entity', { meetupId: meetupId }));
	return this;
};

tasks.prototype.getTasks = function() {
	return this.tasks;
};

var service = {};

service.create = function() {
	return new tasks();
};

module.exports = service;