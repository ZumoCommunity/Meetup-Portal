var o = require('odata');
var configService = require('./config-service');

o().config({
	endpoint: configService.meetupODataApiEndpoint
});

var service = {};

service.tableNames = {
	meetups: 'Meetups',
	partners: 'Partners',
	speakers: 'Speakers'
};

service.getTableReference = function(tableName) {
	return o(tableName);
};

module.exports = service;