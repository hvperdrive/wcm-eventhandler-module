"use strict";

angular.module("dig-events_0.0.84.directives", []);
angular.module("dig-events_0.0.84.factories", []);
angular.module("dig-events_0.0.84.services", ["dig-events_0.0.84.factories"]);
angular.module("dig-events_0.0.84.controllers", ["dig-events_0.0.84.services"]);

angular.module("dig-events_0.0.84", [

	"pelorus.services",

	"dig-events_0.0.84.directives",
	"dig-events_0.0.84.factories",
	"dig-events_0.0.84.services",
	"dig-events_0.0.84.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
