"use strict";

angular.module("dig-events_0.0.74.directives", []);
angular.module("dig-events_0.0.74.factories", []);
angular.module("dig-events_0.0.74.services", ["dig-events_0.0.74.factories"]);
angular.module("dig-events_0.0.74.controllers", ["dig-events_0.0.74.services"]);

angular.module("dig-events_0.0.74", [

	"pelorus.services",

	"dig-events_0.0.74.directives",
	"dig-events_0.0.74.factories",
	"dig-events_0.0.74.services",
	"dig-events_0.0.74.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
