var _ = require('lodash');

var assets = function() {
	this.css = [];
	this.js = [];
};

assets.prototype.addJQuery = function() {
	this.js.push('/assets/jquery/jquery-3.1.1.min.js');
	return this;
};

assets.prototype.addBootstrap = function() {
	this.addJQuery();
	this.css.push('/assets/bootstrap/css/bootstrap.min.css');
	this.css.push('/assets/bootstrap/css/bootstrap-theme.min.css');
	this.js.push('/assets/bootstrap/js/bootstrap.min.js');
	return this;
};

assets.prototype.addFontAwesome = function() {
	this.css.push('/assets/font-awesome/css/font-awesome.min.css');
	return this;
};

assets.prototype.addKnockout = function() {
    this.js.push('/assets/knockout/knockout-3.4.1.js');
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