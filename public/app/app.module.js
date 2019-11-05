"use strict";

angular.module("dig-events_1.0.5.directives", []);
angular.module("dig-events_1.0.5.factories", []);
angular.module("dig-events_1.0.5.services", ["dig-events_1.0.5.factories"]);
angular.module("dig-events_1.0.5.controllers", ["dig-events_1.0.5.services"]);

angular.module("dig-events_1.0.5", [

	"pelorus.services",

	"dig-events_1.0.5.directives",
	"dig-events_1.0.5.factories",
	"dig-events_1.0.5.services",
	"dig-events_1.0.5.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
