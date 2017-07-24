var hooksController = require("../controllers/hooks");

// Initiate listening to events
require("../controllers/listener");

module.exports = function(app, hooks) {
	// Handle hooks
	hooksController(hooks);
};
