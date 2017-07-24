"use strict";

angular.module("dig-events_0.0.62.directives", []);
angular.module("dig-events_0.0.62.factories", []);
angular.module("dig-events_0.0.62.services", ["dig-events_0.0.62.factories"]);
angular.module("dig-events_0.0.62.controllers", ["dig-events_0.0.62.services"]);

angular.module("dig-events_0.0.62", [

	"pelorus.services",

	"dig-events_0.0.62.directives",
	"dig-events_0.0.62.factories",
	"dig-events_0.0.62.services",
	"dig-events_0.0.62.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
