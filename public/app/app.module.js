"use strict";

angular.module("dig-events_0.0.73.directives", []);
angular.module("dig-events_0.0.73.factories", []);
angular.module("dig-events_0.0.73.services", ["dig-events_0.0.73.factories"]);
angular.module("dig-events_0.0.73.controllers", ["dig-events_0.0.73.services"]);

angular.module("dig-events_0.0.73", [

	"pelorus.services",

	"dig-events_0.0.73.directives",
	"dig-events_0.0.73.factories",
	"dig-events_0.0.73.services",
	"dig-events_0.0.73.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
