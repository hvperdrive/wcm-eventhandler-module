"use strict";

angular.module("dig-events_1.0.0.factories")
    .factory("digEventsFactory", [

	"$resource",
	"configuration",

	function digEventsFactory($resource, configuration) {

		var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel;
		var factory = {};

		factory = $resource(api + "dig-events/:listController:id/:docController", {
			id: "@uuid",
			listController: "@listController",
			docController: "@docController",
		}, {
			update: {
				method: "PUT",
			},
		});

		return factory;
	},
]);
