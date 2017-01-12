var should = require('should');

var configService = require('./../../services/config-service');

describe('service', function() {
	describe('config', function() {

		it('Storage is equals to emulator connection string by default', function() {
			var storage = configService.storageConnectionString;

			storage.should.be.eql('UseDevelopmentStorage=true');
		});

		it('SaveFileApi is equals to localhost:8082 by default', function() {
			var saveFileApi = configService.saveFileApi;

			saveFileApi.should.be.eql('http://localhost:8082/api/content.php');
		});

	});
});