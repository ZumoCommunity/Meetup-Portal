var o = require('odata');
var configService = require('./config-service');

o().config({
	endpoint: configService.meetupODataApiEndpoint
});

var service = {};

service.tableNames = {
	meetups: 'Meetups'
};

service.getTableReference = function(tableName) {
	return o(tableName);
};

module.exports = service;