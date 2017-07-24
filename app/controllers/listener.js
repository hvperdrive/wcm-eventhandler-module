var _ = require("lodash");
var request = require("request");
var url = require("url");

var config = require("config")();
var Emitter = require("app/middleware/emitter");
var EventsModel = require("app/models/events");
var variablesHelper = require("../helpers/variables");

var sendEvent = function sendEvent(name, data) {
	if (!name || !data) {
		return;
	}

	var variables = variablesHelper();
	var topic = config.name + "_" + name;
	var apiDomain = variables.eventHandler.variables.apiDomain;
	var namespace = variables.eventHandler.variables.namespace;

	request({
		url: url.resolve(apiDomain + "/" + namespace + "/" + topic + "/publish"),
		method: "GET",
		headers: {
			"owner-key": variables.eventHandler.variables.ownerKey,
			"apikey": variables.eventHandler.variables.apikey,
		},
		body: data,
	}, function(error, response, body) {
		if (error || response.statusCode >= 400) {
			console.error("Emitting event failed!");
			console.error(response.statusCode, body);
		}

		return;
	});

};

var parseConfig = function parseConfig() {
	var reduceEventItem = function reduceEventItem(acc, item) {
		acc[item.name] = item.topic;

		return acc;
	};

	var reduceConfigItem = function reduceConfigItem(acc, item) {
		var ct = _.get(item, "data.contentType.meta.safeLabel");

		if (!ct) {
			return acc;
		}

		acc[ct] = _.reduce(item.data.events, reduceEventItem, {});

		return acc;
	};


	return _.reduce(this.config, reduceConfigItem, {});
};

var selector = function selector(name, data) {
	var ct = _.get(data, "meta.contentType", null);

	if (ct && this.config[ct] && (this.config[ct])[name]) {
		sendEvent.call(this, name, data);
	}

};

var registerListeners = function registerListeners() {
	var me = this;

	_.forEach(Emitter.listRegisterdEvents(), function(eventName) {
		var cb = function(data) {
			selector.call(me, eventName, data);
		};

		me.callbacks.push({
			name: eventName,
			cb: cb,
		});
		Emitter.on(eventName, cb);
	});
};

function Listener() {
	this.config = null;
	this.callbacks = [];
	this.reloadConfig();

	registerListeners.call(this);
}

Listener.prototype.reloadConfig = function reloadConfig() {
	EventsModel.find({})
		.populate("data.contentType")
		.lean()
		.then(
			function onSuccess(response) {
				this.config = parseConfig.call(this, response);
			}.bind(this)
		);
};

Listener.prototype.removeListeners = function removeListeners() {
	_.forEach(this.callbacks, function(cb) {
		Emitter.removeListener(cb.name, cb);
	});
};

module.exports = new Listener();
