var Q = require("q");
var request = require("request");

var variablesHelper = require("../helpers/variables");

module.exports = function eventRequest(method, path, body) {
	var d = Q.defer();

	var variables = variablesHelper();
	var apiDomain = variables.eventHandler.variables.apiDomain;
	var namespace = variables.eventHandler.variables.namespace;

	var reqOptions = {
		url: apiDomain + (apiDomain.endsWith("/") ? "" : "/") + namespace + "/" + path,
		method: method,
		headers: {
			"owner-key": variables.eventHandler.variables.ownerKey,
			"apikey": variables.eventHandler.variables.apikey,
		},
	};

	if (body) {
		Object.assign(reqOptions, {
			body: body,
			json: true,
		});
	}

	request(reqOptions, function(error, response, body) {
		if (error || !response || response.statusCode >= 400) {
			return d.reject(error || body);
		}

		return d.resolve(body);
	});


	return d.promise;
};
