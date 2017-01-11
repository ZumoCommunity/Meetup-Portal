var _ = require('lodash');

var assets = function() {
	this.css = [];
	this.js = [];
};

assets.prototype.addJQuery = function() {
	this.js.push('jQuery js');
	return this;
};

assets.prototype.addBootstrap = function() {
	this.addJQuery();
	this.css.push('bootstrap css');
	this.js.push('bootstrap js');
	return this;
};

assets.prototype.render = function() {
	return {
		css: _.uniq(this.css),
		js: _.uniq(this.js)
	};
};

var service = {};

service.create = function() {
	return new assets();
};

module.exports = service;