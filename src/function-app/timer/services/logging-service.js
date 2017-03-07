var configService = require('./config-service');

var appInsights = require('applicationinsights');
appInsights
	.setup(configService.appInsightInstrumentationKey)
	.setAutoCollectConsole(true)
	.setAutoCollectExceptions(true)
	.setAutoCollectPerformance(true)
	.setAutoCollectRequests(true)
	.setAutoCollectDependencies(true)
	.start();

var service = appInsights.getClient(configService.appInsightInstrumentationKey);

module.exports = service;