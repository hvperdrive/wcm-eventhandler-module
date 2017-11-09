var eventListener = require("./listener");

var beforeRemove = function beforeRemove() {
	eventListener.removeListeners();
};

var beforeDisable = function beforeDisable() {
	eventListener.removeListeners();
};

var onEnabled = function onEnabled() {
	eventListener.reinitialize();
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		beforeRemove: beforeRemove,
		beforeDisable: beforeDisable,
		onEnabled: onEnabled,
	};

	Object.assign(hooks, myHooks);
};
