"use strict";

angular.module("dig-events_1.0.2.directives", []);
angular.module("dig-events_1.0.2.factories", []);
angular.module("dig-events_1.0.2.services", ["dig-events_1.0.2.factories"]);
angular.module("dig-events_1.0.2.controllers", ["dig-events_1.0.2.services"]);

angular.module("dig-events_1.0.2", [

	"pelorus.services",

	"dig-events_1.0.2.directives",
	"dig-events_1.0.2.factories",
	"dig-events_1.0.2.services",
	"dig-events_1.0.2.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
