var Emitter = require("events");
var emitter = new Emitter();

module.exports = emitter;
module.exports.listRegisterdEvents = function() {
	return {
		"content":["contentCreated", "contentUpdated", "contentRemoved"],
		"menu":["menuCreated", "menuUpdated", "menuRemoved"],
		"variables":["variablesCreated", "variablesUpdated", "variablesRemoved"],
	};
};
