"use strict";

angular.module("dig-events_0.0.76.directives", []);
angular.module("dig-events_0.0.76.factories", []);
angular.module("dig-events_0.0.76.services", ["dig-events_0.0.76.factories"]);
angular.module("dig-events_0.0.76.controllers", ["dig-events_0.0.76.services"]);

angular.module("dig-events_0.0.76", [

	"pelorus.services",

	"dig-events_0.0.76.directives",
	"dig-events_0.0.76.factories",
	"dig-events_0.0.76.services",
	"dig-events_0.0.76.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
