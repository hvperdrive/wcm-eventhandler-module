const _ = require("lodash");
const Q = require("q");
const { __, compose, pathOr } = require("ramda");

const config = require("@wcm/module-helper").getConfig();
const Emitter = require("@wcm/module-helper").emitter;
const EventsModel = require("../models/events");
const eventRequestHelper = require("../helpers/eventRequest");

const getCTUuid = (item, prefixPath = []) =>
	compose(
		(id) => (id !== null ? id.toString() : id),
		pathOr(__, prefixPath.concat([ "contentType", "_id" ]), item),
		pathOr(null, prefixPath.concat([ "contentType" ]))
	)(item);

const parseConfig = (items) => {
	const contentFilter = (item) => {
		const ct = getCTUuid(item, [ "data" ]);

		if (!ct) {
			return false;
		}

		return (data) => {
			const ctId = getCTUuid(data, [ "meta" ]);

			return ct === ctId;
		};
	};

	const setFilter = (item) => {
		const source = _.get(item, "meta.source", false);

		if (source === "content") {
			return contentFilter(item);
		}
	};

	const reduceConfigItem = (acc, item) => {
		_.forEach(_.get(item, "data.events", []), (event) => {
			const eventName = `${item.meta.source}.${event.name}`;

			if (!acc[eventName]) {
				acc[eventName] = [];
			}

			acc[eventName].push({
				topic: event.topic,
				filter: setFilter(item),
			});
		});

		return acc;
	};

	return _.reduce(items, reduceConfigItem, {});
};

const sendEvent = (event, data) => {
	if (!event || !event.topic || !data) {
		return Q.reject();
	}

	const topic = event.topic;

	return eventRequestHelper("POST", topic + "/publish", data);
};

const getRequiredEvents = function(name, data) {
	if (this.config === null || !this.config[name]) {
		return;
	}

	const eventGroup = this.config[name];

	return _.filter(eventGroup, (event) => {
		if (typeof event.filter === "function") {
			return event.filter(data);
		} else if (event.filter === false) {
			return false;
		}

		return true;
	});
};

const selector = function selector(name, data) {
	const requiredEvents = getRequiredEvents.call(this, name, data);

	if (!Array.isArray(requiredEvents) || !requiredEvents.length) {
		return;
	}

	_.forEach(requiredEvents, (event) => Q(sendEvent(event, data)));
};

const registerListeners = function registerListeners() {
	Emitter.prependAny(this.cb);
};

class Listener {
	constructor() {
		this.config = null;
		this.cb = selector.bind(this);

		this.reinitialize();
	}

	reloadConfig() {
		return EventsModel.find({})
			.populate("data.contentType")
			.lean()
			.then((response) => {
				this.config = parseConfig.call(this, response)
			});
	}

	reinitialize() {
		this.reloadConfig();
		this.removeListeners();
		registerListeners.call(this);
	}

	removeListeners() {
		if (!Array.isArray(Emitter.listenersAny()) || !Emitter.listenersAny().length) {
			return;
		}

		Emitter.offAny(this.cb);
	}
}

module.exports = new Listener();
