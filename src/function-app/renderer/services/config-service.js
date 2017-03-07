var nconf = require('nconf');
var path = require('path');

var appSettingsPath = path.join(__dirname, './../../appsettings.json');

nconf
	.file({ file: appSettingsPath })
	.argv()
	.env();

var service = {};

service.masterApiKey = nconf.get('MasterApiKey')|| nconf.get('Values').MasterApiKey;
service.saveFileApi = nconf.get('SaveFileApi') || nconf.get('Values').SaveFileApi;
service.storageConnectionString = nconf.get('Storage')|| nconf.get('Values').Storage;
service.meetupODataApiEndpoint = nconf.get('MeetupODataApiEndpoint')|| nconf.get('Values').MeetupODataApiEndpoint;
service.applicationApiEndpoint = nconf.get('ApplicationApiEndpoint')|| nconf.get('Values').ApplicationApiEndpoint;
service.timeZone = parseInt(nconf.get('TimeZone')|| nconf.get('Values').TimeZone);
service.GoogleMapsApiKey = nconf.get('GoogleMapsApiKey')|| nconf.get('Values').GoogleMapsApiKey;
service.appInsightInstrumentationKey = nconf.get('AppInsightInstrumentationKey')|| nconf.get('Values').AppInsightInstrumentationKey;

module.exports = service;