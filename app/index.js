var hooksController = require("./controllers/hooks");
var variablesHelper = require("./helpers/variables");
var routes = require("./routes");

module.exports = function(app, hooks, moduleInfo) {
	// Set modules info received from the module system
	variablesHelper.setPackageInfo(moduleInfo);
	// Handle hooks
	hooksController(hooks);
	// Initiate listening to events
	require("./controllers/listener");
	// Setup routes
	routes(app);
};
