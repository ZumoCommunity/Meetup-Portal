var nconf = require('nconf');
var path = require('path');

var appSettingsPath = path.join(__dirname, './../../appsettings.json');

nconf
	.file({ file: appSettingsPath })
	.argv()
	.env();

var service = {};

service.saveFileApi = nconf.get('SaveFileApi') || nconf.get('Values').SaveFileApi;
service.storageConnectionString = nconf.get('Storage')|| nconf.get('Values').Storage;

module.exports = service;