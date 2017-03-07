var nconf = require('nconf');
var path = require('path');

var appSettingsPath = path.join(__dirname, './../../appsettings.json');

nconf
	.file({ file: appSettingsPath })
	.argv()
	.env();

var service = {};

service.masterApiKey = nconf.get('MasterApiKey')|| nconf.get('Values').MasterApiKey;
service.storageConnectionString = nconf.get('Storage')|| nconf.get('Values').Storage;
service.meetupODataApiEndpoint = nconf.get('MeetupODataApiEndpoint')|| nconf.get('Values').MeetupODataApiEndpoint;
service.appInsightInstrumentationKey = nconf.get('AppInsightInstrumentationKey')|| nconf.get('Values').AppInsightInstrumentationKey;

module.exports = service;