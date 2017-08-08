var Emitter = require("events");

module.exports.emitter = new Emitter();
module.exports.listRegisterdEvents = function() {
	return {
		"content":["contentCreated", "contentUpdated", "contentRemoved"],
		"menu":["menuCreated", "menuUpdated", "menuRemoved"],
		"variables":["variablesCreated", "variablesUpdated", "variablesRemoved"]
	};
};
