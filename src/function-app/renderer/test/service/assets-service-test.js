var should = require('should');

var assetsService = require('./../../services/assets-service');

describe('service', function() {
	describe('assets', function() {

		it('css and js are empty by default', function() {
			var assets = assetsService
				.create()
				.render();

			assets.css.should.be.an.Array;
			assets.js.should.be.an.Array;

			assets.css.should.have.lengthOf(0);
			assets.js.should.have.lengthOf(0);
		});

		it('css and js are unique', function() {
			var assets = assetsService
				.create()
				.addJQuery()
				.addBootstrap()
				.render();

			assets.css.should.be.an.Array;
			assets.js.should.be.an.Array;

			assets.css.should.have.lengthOf(2);
			assets.js.should.have.lengthOf(2);
		});

		it('different assets - different values', function() {
			var assets1 = assetsService
				.create()
				.addJQuery()
				.render();

			var assets2 = assetsService
				.create()
				.addBootstrap()
				.render();

			assets1.css.should.be.an.Array;
			assets1.js.should.be.an.Array;

			assets1.css.should.have.lengthOf(0);
			assets1.js.should.have.lengthOf(1);

			assets2.css.should.be.an.Array;
			assets2.js.should.be.an.Array;

			assets2.css.should.have.lengthOf(2);
			assets2.js.should.have.lengthOf(2);
		});

		it('jquery - 1 js, 0 css', function() {
			var assets = assetsService
				.create()
				.addJQuery()
				.render();

			assets.css.should.be.an.Array;
			assets.js.should.be.an.Array;

			assets.css.should.have.lengthOf(0);
			assets.js.should.have.lengthOf(1);
		});

		it('bootstrap - jquery + 1 js, 2 css', function() {
			var assets = assetsService
				.create()
				.addBootstrap()
				.render();

			assets.css.should.be.an.Array;
			assets.js.should.be.an.Array;

			assets.css.should.have.lengthOf(2);
			assets.js.should.have.lengthOf(2);
		});
	});
});