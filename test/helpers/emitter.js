var Emitter = require("eventemitter2").EventEmitter2;

var emitter = new Emitter({
	wildcard: true,
	delimiter: ".",
	newListener: true,
	maxListeners: 0,
	verboseMemoryLeak: true,
});

module.exports = emitter;
module.exports.listRegisterdEvents = function() {
	return {
		"content":["contentCreated", "contentUpdated", "contentRemoved"],
		"menu":["menuCreated", "menuUpdated", "menuRemoved"],
		"variables":["variablesCreated", "variablesUpdated", "variablesRemoved"],
	};
};
