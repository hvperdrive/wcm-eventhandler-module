"use strict";

angular.module("dig-events_0.0.73")
    .provider("digEventsConfig", [
	function membersConfig() {

		this.API = {
			name: "dig-events",
			version: "0.0.73",
			basePath: "app/modules/",
		};

		this.API.modulePath = this.API.basePath + this.API.name + "_" + this.API.version + "/";

		this.$get = function get() {
			return this.API;
		};
	},
]);
