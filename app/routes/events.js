"use strict";

require("rootpath")();
var eventsController = require("../controllers/events");

// Get the configuration of the WCM
var config = require("config")();
// This is a helper middleware function to check if the user is logged in
var ProfileSecurity = require("app/helpers/modules/lib").ProfileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
var MethodSecurity = require("app/helpers/modules/lib").MethodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
var PermissionsSecurity = require("app/helpers/modules/lib").PermissionsSecurity("dig-events");
// Modifies meta object of the body
var Meta = require("app/helpers/meta");
// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
var baseUrl = "/" + config.api.prefix + config.api.version + "dig-events";

module.exports = function(app) {

	app.route(baseUrl).get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, eventsController.read);
	app.route(baseUrl + "/list").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, eventsController.list);
	app.route(baseUrl + "/:uuid").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, eventsController.readOne);

	app.route(baseUrl).post(ProfileSecurity, MethodSecurity.create, PermissionsSecurity, Meta, eventsController.create);

	app.route(baseUrl + "/:uuid").put(ProfileSecurity, MethodSecurity.update, PermissionsSecurity, Meta, eventsController.update);

	app.route(baseUrl + "/:uuid").delete(ProfileSecurity, MethodSecurity.delete, PermissionsSecurity, eventsController.remove);

};
