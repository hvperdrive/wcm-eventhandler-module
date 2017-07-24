"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uuid = require("node-uuid");

delete mongoose.models.DigEvents;
delete mongoose.modelSchemas.DigEvents;
var DigEventsSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
	},
	data: {
		contentType: {
			type: String,
			ref: "ContentType",
			required: true,
		},
		events: [{
			name: {
				type: String,
				required: true,
			},
			topic: {
				type: String,
				required: true,
			},
		}],
	},
	meta: {
		created: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lastModified: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
});

// Set the name of the collection
DigEventsSchema.set("collection", "digevents");
module.exports = mongoose.model("DigEvents", DigEventsSchema);
