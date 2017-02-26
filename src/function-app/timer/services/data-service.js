var o = require('odata');
var configService = require('./config-service');

o().config({
	endpoint: configService.meetupODataApiEndpoint,
	appending: [ { name: 'api_key', value: configService.masterApiKey } ]
});

var service = {};

service.tableNames = {
	agendaItems: 'AgendaItems',
	meetups: 'Meetups',
	partners: 'Partners',
	speakers: 'Speakers'
};

service.getTableReference = function(tableName) {
	return o(tableName);
};

module.exports = service;