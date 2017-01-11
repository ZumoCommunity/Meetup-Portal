var service = {};


module.exports = function (context, queueItem) {
	context.log('JavaScript queue trigger function processed work item', queueItem);
	context.done();
};