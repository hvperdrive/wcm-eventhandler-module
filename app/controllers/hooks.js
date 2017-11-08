var variablesHelper = require("../helpers/variables");
var eventListener = require("./listener");

var onConfigurationChanged = function onConfigurationChanged() {
	// Reload config
	variablesHelper.reload();
};

var beforeRemove = function beforeRemove() {
	eventListener.removeListeners();
};

var beforeDisable = function beforeDisable() {
	eventListener.removeListeners();
};

var onEnabled = function onEnabled() {
	eventListener.reinitialize();
};

var onLoadComplete = function onLoadComplete() {
	variablesHelper.reload();
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		onConfigurationChanged: onConfigurationChanged,
		beforeRemove: beforeRemove,
		beforeDisable: beforeDisable,
		onEnabled: onEnabled,
		onLoadComplete: onLoadComplete,
	};

	Object.assign(hooks, myHooks);
};
