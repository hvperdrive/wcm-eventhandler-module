var hooksController = require("./controllers/hooks");
var variablesHelper = require("./helpers/variables");

module.exports = function(app, hooks, moduleInfo) {
	// Set modules info received from the module system
	variablesHelper.setPackageInfo(moduleInfo);
	// Handle hooks
	hooksController(hooks);
	// Initiate listening to events
	require("./controllers/listener");
};
