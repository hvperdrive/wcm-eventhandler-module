
"use strict";

require("rootpath")();
var ERROR_TYPES = require("app/middleware/errorInterceptor").ERROR_TYPES;
var Emitter = require("app/middleware/emitter");

var EventsModel = require("../models/events");

module.exports.list = function list(req, res) {
	var result = ["contentUpdated", "contentCreated", "contentRemoved"];

	if (Emitter.listRegisterdEvents) {
		result = Emitter.listRegisterdEvents();
	}

	res.status(200).json(result);
};

/**
 * @api {GET} /api/1.0.0/dig-events/ Get all members.
 * @apiGroup Events
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} Members200All Success
 * @apiSuccess (200) {Object} Members200All Success
 * @apiSuccess (200) {String} Members200All._id Mongo _id
 * @apiSuccess (200) {String} Members200All.uuid Member uuid
 * @apiSuccess (200) {Object} Members200All.data Data
 * @apiSuccess (200) {String} Members200All.data.external_id of member
 * @apiSuccess (200) {String} Members200All.data.username Username of the member
 * @apiSuccess (200) {String} Members200All.data.firstName First name of the member
 * @apiSuccess (200) {String} Members200All.data.lastName Last name of the member
 * @apiSuccess (200) {String} Members200All.data.fullName Full name of the member
 * @apiSuccess (200) {String} Members200All.data.avatarUrl Avatar URL
 * @apiSuccess (200) {String} Members200All.data.phone Phone number
 * @apiSuccess (200) {String} Members200All.data.email Email address
 * @apiSuccess (200) {Object} Members200All.meta Metadata
 * @apiSuccess (200) {Date} Members200All.meta.created Created at
 * @apiSuccess (200) {Date} Members200All.meta.lastModified Last modified at
 * @apiSuccess (200) {string} Members200All.meta.type Type of login source
 * @apiSuccess (200) {string} Members200All.meta.enabled Member has accessToken
 * @apiSuccess (200) {Object} Members200All.meta.token Stripped down version of the token object
 * @apiSuccess (200) {Date} Members200All.meta.token.expires Token expires date.
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
 * @api {GET} /api/1.0.0/dig-events/:uuid Get all members.
 * @apiGroup Events
 * @apiParam {String} uuid Members uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Members200One Success
 * @apiSuccess (200) {String} Members200One._id Mongo _id
 * @apiSuccess (200) {String} Members200One.uuid Member uuid
 * @apiSuccess (200) {Object} Members200One.data Data
 * @apiSuccess (200) {String} Members200One.data.external_id of member
 * @apiSuccess (200) {String} Members200One.data.username Username of the member
 * @apiSuccess (200) {String} Members200One.data.firstName First name of the member
 * @apiSuccess (200) {String} Members200One.data.lastName Last name of the member
 * @apiSuccess (200) {String} Members200One.data.fullName Full name of the member
 * @apiSuccess (200) {String} Members200One.data.avatarUrl Avatar URL
 * @apiSuccess (200) {String} Members200One.data.phone Phone number
 * @apiSuccess (200) {String} Members200One.data.email Email address
 * @apiSuccess (200) {Object} Members200One.meta Metadata
 * @apiSuccess (200) {Date} Members200One.meta.created Created at
 * @apiSuccess (200) {Date} Members200One.meta.lastModified Last modified at
 * @apiSuccess (200) {string} Members200One.meta.type Type of login source
 * @apiSuccess (200) {string} Members200One.meta.enabled Member has accessToken
 * @apiSuccess (200) {Object} Members200One.meta.token Stripped down version of the token object
 * @apiSuccess (200) {Date} Members200One.meta.token.expires Token expires date.
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
		.then(
			function onSuccess(event) {
				if (event) {
					return res.status(200).json(event);
				}

				return res.statu(404).json({
					err: 'Event width uuid: "' + req.params.uuid + '" not found',
				});
			},
			function onError(responseError) {
				res.status(400).json(responseError);
			}
		);
};

/**
 * @api {PUT} /api/1.0.0/dig-events/:uuid Get all members.
 * @apiGroup Events
 * @apiParam {String} uuid Members uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Members200Update Success
 * @apiSuccess (200) {String} Members200Update._id Mongo _id
 * @apiSuccess (200) {String} Members200Update.uuid Member uuid
 * @apiSuccess (200) {Object} Members200Update.data Data
 * @apiSuccess (200) {String} Members200Update.data.external_id of member
 * @apiSuccess (200) {String} Members200Update.data.username Username of the member
 * @apiSuccess (200) {String} Members200Update.data.firstName First name of the member
 * @apiSuccess (200) {String} Members200Update.data.lastName Last name of the member
 * @apiSuccess (200) {String} Members200Update.data.fullName Full name of the member
 * @apiSuccess (200) {String} Members200Update.data.avatarUrl Avatar URL
 * @apiSuccess (200) {String} Members200Update.data.phone Phone number
 * @apiSuccess (200) {String} Members200Update.data.email Email address
 * @apiSuccess (200) {Object} Members200Update.meta Metadata
 * @apiSuccess (200) {Date} Members200Update.meta.created Created at
 * @apiSuccess (200) {Date} Members200Update.meta.lastModified Last modified at
 * @apiSuccess (200) {string} Members200Update.meta.type Type of login source
 * @apiSuccess (200) {string} Members200Update.meta.enabled Member has accessToken
 * @apiSuccess (200) {Object} Members200Update.meta.token Stripped down version of the token object
 * @apiSuccess (200) {Date} Members200Update.meta.token.expires Token expires date.
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

	EventsModel.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true, setDefaultsOnInsert: true })
		.then(function onSuccess(event) {
			if (event) {
				return res.status(200).json(event);
			}

			return res.statu(404).json({
				err: 'Event width uuid: "' + req.params.uuid + '" not found',
			});
		}, function onError(responseError) {
			res.status(400).json(responseError);
		});
};

/**
 * @api {POST} /api/1.0.0/dig-events create an event.
 * @apiGroup Events
 * @apiParam {String} uuid Members uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Members200Update Success
 * @apiSuccess (200) {String} Members200Update._id Mongo _id
 * @apiSuccess (200) {String} Members200Update.uuid Member uuid
 * @apiSuccess (200) {Object} Members200Update.data Data
 * @apiSuccess (200) {String} Members200Update.data.external_id of member
 * @apiSuccess (200) {String} Members200Update.data.username Username of the member
 * @apiSuccess (200) {String} Members200Update.data.firstName First name of the member
 * @apiSuccess (200) {String} Members200Update.data.lastName Last name of the member
 * @apiSuccess (200) {String} Members200Update.data.fullName Full name of the member
 * @apiSuccess (200) {String} Members200Update.data.avatarUrl Avatar URL
 * @apiSuccess (200) {String} Members200Update.data.phone Phone number
 * @apiSuccess (200) {String} Members200Update.data.email Email address
 * @apiSuccess (200) {Object} Members200Update.meta Metadata
 * @apiSuccess (200) {Date} Members200Update.meta.created Created at
 * @apiSuccess (200) {Date} Members200Update.meta.lastModified Last modified at
 * @apiSuccess (200) {string} Members200Update.meta.type Type of login source
 * @apiSuccess (200) {string} Members200Update.meta.enabled Member has accessToken
 * @apiSuccess (200) {Object} Members200Update.meta.token Stripped down version of the token object
 * @apiSuccess (200) {Date} Members200Update.meta.token.expires Token expires date.
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (404) {Object} Error Not found
 * @apiError (400) {Object} Error Bad request
 */
module.exports.create = function create(req, res) {
	EventsModel.create(req.body)
		.then(function onSuccess(event) {
			if (event) {
				return res.status(200).json(event);
			}

			return res.statu(404).json({
				err: 'Event width uuid: "' + req.params.uuid + '" not found',
			});
		}, function onError(responseError) {
			res.status(400).json(responseError);
		});
};

/**
 * @api {DELETE} /api/1.0.0/dig-events/:uuid Get all members.
 * @apiGroup Events
 * @apiParam {String} uuid Members uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (204) empty Empty response
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (400) {Object} Error Bad request
 */
module.exports.remove = function remove(req, res) {
	if (!req.params.uuid) {
		return res.status(400).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.remove({ uuid: req.params.uuid })
		.then(function onSuccess() {
			res.status(204).json();
		}, function onError(responseError) {
			res.status(400).json(responseError);
		});
};
