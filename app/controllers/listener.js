var _ = require("lodash");

var config = require("config")();
var Emitter = require("app/middleware/emitter");
var EventsModel = require("../models/events");
var eventRequestHelper = require("../helpers/eventRequest");

var parseConfig = function parseConfig(items) {

	var contentFilter = function contentFilter(item) {
		var ct = _.get(item, "data.contentType.meta.safeLabel");

		if (!ct) {
			return false;
		}

		return function(data) {
			var ctLabel = _.get(data, "meta.contentType.meta.safeLabel", null);
			return ct === ctLabel;
		};
	};

	var setFilter = function setFilter(event, item) {
		var source = _.get(item, "meta.source", false);

		if (source === "content") {
			return contentFilter(item);
		}
	};

	var reduceConfigItem = function reduceConfigItem(acc, item) {

		_.forEach(_.get(item, "data.events", []), function(event) {
			if (!acc[event.name]) {
				acc[event.name] = [];
			}

			acc[event.name].push({
				topic: event.topic,
				filter: setFilter(event, item),
			});
		});

		return acc;
	};

	return _.reduce(items, reduceConfigItem, {});
};

var sendEvent = function sendEvent(event, data) {
	if (!event || !event.topic || !data) {
		return Q.reject();
	}

	var topic = config.name + "_" + event.topic;

	return eventRequestHelper("PUT", topic + "/publish", data);
};

var getRequiredEvents = function getRequiredEvents(name, data) {
	var eventGroup = this.config[name];

	return _.filter(eventGroup, function(event) {
		if (typeof event.filter === "function") {
			return event.filter(data);
		} else if (event.filter === false) {
			return false;
		}

		return true;
	});
};

var selector = function selector(name, data) {
	var requiredEvents = getRequiredEvents.call(this, name, data);

	if (!Array.isArray(requiredEvents) || !requiredEvents.length) {
		return;
	}

	_.forEach(requiredEvents, function(event) {
		sendEvent.call(this, event, data);
	}.bind(this));
};

var registerListeners = function registerListeners() {
	var me = this;

	_.forEach(_.flatten(_.values(Emitter.listRegisterdEvents())), function(eventName) {
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
	this.reloadConfig.call(this);

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

Listener.prototype.reinitialize = function reinitialize() {
	this.reloadConfig.call(this);
	registerListeners.call(this);
};

Listener.prototype.removeListeners = function removeListeners() {
	_.forEach(this.callbacks, function(cb) {
		Emitter.removeListener(cb.name, cb.cb);
	});

	this.callbacks = [];
};

module.exports = new Listener();
