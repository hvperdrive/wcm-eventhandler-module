var _ = require("lodash");
var Q = require("q");

var config = require("config")();
var EventsModel = require("../models/events");
var eventRequestHelper = require("./eventRequest");
var listenerController = require("../controllers/listener");

var create = module.exports.create = function create(event) {
	var events = _.get(event, "data.events", []);
	var promises = _.map(events, function(e) {
		return eventRequestHelper("PUT", "topics/" + config.name + "_" + e.topic);
	});

	return Q.all(promises)
		.then(function() {
			listenerController.reloadConfig();
			return event;
		});
};

var remove = module.exports.remove = function remove(event) {
	var events = _.get(event, "data.events", []);
	var promises = _.map(events, function(e) {
		return EventsModel.findOne({ "data.events.topic": e.topic })
			.lean()
			.then(function(eventStillExists) {
				if (eventStillExists) {
					return;
				}

				return eventRequestHelper("DELETE", "topics/" + config.name + "_" + e.topic);
			});
	});

	return Q.all(promises)
		.then(function() {
			listenerController.reloadConfig();
			return event;
		});
};

module.exports.update = function update(oldTopic, newTopic) {
	return remove(oldTopic)
		.then(function() {
			return create(newTopic);
		}, function() {
			return create(newTopic);
		})
		.then(function() {
			listenerController.reloadConfig();
			return newTopic;
		});
};
