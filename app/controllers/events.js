
"use strict";

require("rootpath")();
var ERROR_TYPES = require("app/middleware/errorInterceptor").ERROR_TYPES;
var Emitter = require("@wcm/module-helper").emitter;

var EventsModel = require("../models/events");
var topicsHelper = require("../helpers/topics");

module.exports.list = function list(req, res) {
	var result = ["contentUpdated", "contentCreated", "contentRemoved"];

	if (Emitter.listRegisterdEvents) {
		result = Emitter.listRegisterdEvents();
	}

	res.status(200).json(result);
};

/**
 * @api {GET} /api/1.0.0/dig-events/ Get all event setups
 * @apiGroup Events
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} Events200All Success
 *
 * @apiError (500) {Object} Error Bad request
 */
module.exports.read = function read(req, res) {
	EventsModel.find({})
		.populate("data.contentType")
		.then(function onSuccess(events) {
			res.status(200).json(events);
		}, function onError(responseError) {
			res.status(500).json(responseError);
		});
};

/**
 * @api {GET} /api/1.0.0/dig-events/:uuid Get an event setup
 * @apiGroup Events
 * @apiParam {String} uuid Event uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Events200One Success
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (404) {Object} Error Not found
 * @apiError (400) {Object} Error Bad request
 */
module.exports.readOne = function readOne(req, res) {
	if (!req.params.uuid) {
		return res.status(412).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.findOne({ uuid: req.params.uuid })
		.populate("data.contentType")
		.then(function onSuccess(event) {
			if (event) {
				return res.status(200).json(event);
			}

			return res.status(404).json({
				err: 'Event with uuid: "' + req.params.uuid + '" not found',
			});
		}, function onError(responseError) {
			res.status(400).json(responseError);
		});
};

/**
 * @api {PUT} /api/1.0.0/dig-events/:uuid Update Event setup
 * @apiGroup Events
 * @apiParam {String} uuid Event uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Events200Update Success
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (404) {Object} Error Not found
 * @apiError (400) {Object} Error Bad request
 */
module.exports.update = function update(req, res) {
	if (!req.params.uuid) {
		return res.status(412).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.findOne({ uuid: req.params.uuid })
		.lean()
		.then(function onSuccess(oldEvent) {
			return EventsModel.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true, setDefaultsOnInsert: true })
				.then(function(newEvent) {
					if (newEvent) {
						return topicsHelper.update(oldEvent, newEvent);
					}

					throw { status: 404, err: "Event width uuid: '" + req.params.uuid + "' not found" };
				});
		}, function(error) {
			throw { status: 400, err: error };
		})
		.then(function(newEvent) {
			return res.status(200).json(newEvent);
		}, function(error) {
			return res.status(error.status || 400).json(error.err || error);
		});
};

/**
 * @api {POST} /api/1.0.0/dig-events create an event.
 * @apiGroup Events
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Events200CreateSuccess
 *
 * @apiError (400) {Object} Error Bad request
 */
module.exports.create = function create(req, res) {
	EventsModel.create(req.body)
		.then(function(event) {
			if (!event) {
				throw "Event not saved!";
			}

			return topicsHelper.create(event);
		})
		.then(function onSuccess(event) {
			return res.status(200).json(event);
		}, function onError(responseError) {
			return res.status(400).json(responseError);
		});
};

/**
 * @api {DELETE} /api/1.0.0/dig-events/:uuid Delete an event setup.
 * @apiGroup Events
 * @apiParam {String} uuid Events uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (204) Empty Empty response
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (400) {Object} Error Bad request
 */
module.exports.remove = function remove(req, res) {
	if (!req.params.uuid) {
		return res.status(412).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.findOne({ uuid: req.params.uuid })
		.then(function(event) {
			return EventsModel.remove({ uuid: req.params.uuid })
				.then(function() {
					return event;
				});
		})
		.then(topicsHelper.remove)
		.then(function onSuccess() {
			res.status(204).send();
		}, function onError(responseError) {
			res.status(400).json(responseError);
		});
};
