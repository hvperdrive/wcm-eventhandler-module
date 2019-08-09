"use strict";

angular.module("dig-events_1.0.4.directives", []);
angular.module("dig-events_1.0.4.factories", []);
angular.module("dig-events_1.0.4.services", ["dig-events_1.0.4.factories"]);
angular.module("dig-events_1.0.4.controllers", ["dig-events_1.0.4.services"]);

angular.module("dig-events_1.0.4", [

	"pelorus.services",

	"dig-events_1.0.4.directives",
	"dig-events_1.0.4.factories",
	"dig-events_1.0.4.services",
	"dig-events_1.0.4.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
