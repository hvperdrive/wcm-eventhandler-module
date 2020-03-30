"use strict";

angular.module("dig-events_3.0.0.directives", []);
angular.module("dig-events_3.0.0.factories", []);
angular.module("dig-events_3.0.0.services", ["dig-events_3.0.0.factories"]);
angular.module("dig-events_3.0.0.controllers", ["dig-events_3.0.0.services"]);

angular.module("dig-events_3.0.0", [

	"pelorus.services",

	"dig-events_3.0.0.directives",
	"dig-events_3.0.0.factories",
	"dig-events_3.0.0.services",
	"dig-events_3.0.0.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
