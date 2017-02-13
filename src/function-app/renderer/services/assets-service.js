var _ = require('lodash');

var assets = function(cdnEndpoint) {
	this.cdnEndpoint = cdnEndpoint || '';
	this.css = [];
	this.js = [];
};

assets.prototype.addJQuery = function() {
	this.js.push(cdnEndpoint + '/assets/jquery/jquery-3.1.1.min.js');
	return this;
};

assets.prototype.addJQueryUI = function() {
	this.addJQuery();
	this.css.push(cdnEndpoint + '/assets/jquery-ui/jquery-ui.min.css');
	this.css.push(cdnEndpoint + '/assets/jquery-ui/jquery-ui.structure.min.css');
	this.js.push(cdnEndpoint + '/assets/jquery-ui/jquery-ui.min.js');
	return this;
};

assets.prototype.addBootstrap = function() {
	this.addJQuery();
	this.css.push(cdnEndpoint + '/assets/bootstrap/css/bootstrap.min.css');
	this.css.push(cdnEndpoint + '/assets/bootstrap/css/bootstrap-theme.min.css');
	this.js.push(cdnEndpoint + '/assets/bootstrap/js/bootstrap.min.js');
	return this;
};

assets.prototype.addFontAwesome = function() {
	this.css.push(cdnEndpoint + '/assets/font-awesome/css/font-awesome.min.css');
	return this;
};

assets.prototype.addKnockout = function() {
    this.js.push(cdnEndpoint + '/assets/knockout/knockout-3.4.1.js');
    return this;
};

assets.prototype.render = function() {
	return {
		css: _.uniq(this.css),
		js: _.uniq(this.js)
	};
};

var service = {};

service.create = function(cdnEndpoint) {
	return new assets(cdnEndpoint);
};

module.exports = service;