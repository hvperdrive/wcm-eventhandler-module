var variablesHelper = require("../helpers/variables");
var eventListener = require("./listener");

var onConfigurationChanged = function onConfigurationChanged() {
	console.log("Updating Event handler listener config (configuration changed)");
	// Reload config
	variablesHelper.reload();
};

var beforeRemove = function beforeRemove() {
	console.log("Removing Event handler listeners (module removed)");
	eventListener.removeListeners();
};

var beforeDisable = function beforeDisable() {
	console.log("Removing Event handler listeners (module disabled)");
	eventListener.removeListeners();
};

var onEnabled = function onEnabled() {
	console.log("Reinitializing Event handler listeners (module enabled)");
	eventListener.reinitialize();
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		onConfigurationChanged: onConfigurationChanged,
		beforeRemove: beforeRemove,
		beforeDisable: beforeDisable,
		onEnabled: onEnabled,
	};

	Object.assign(hooks, myHooks);
};
