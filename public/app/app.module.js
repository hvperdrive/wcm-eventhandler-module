"use strict";

angular.module("dig-events_0.0.117.directives", []);
angular.module("dig-events_0.0.117.factories", []);
angular.module("dig-events_0.0.117.services", ["dig-events_0.0.117.factories"]);
angular.module("dig-events_0.0.117.controllers", ["dig-events_0.0.117.services"]);

angular.module("dig-events_0.0.117", [

	"pelorus.services",

	"dig-events_0.0.117.directives",
	"dig-events_0.0.117.factories",
	"dig-events_0.0.117.services",
	"dig-events_0.0.117.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
