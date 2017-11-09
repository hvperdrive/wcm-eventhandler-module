var Q = require("q");
var _ = require("lodash");
var request = require("request");

var variablesHelper = require("../helpers/variables");

module.exports = function eventRequest(method, path, body) {
	var d = Q.defer();

	variablesHelper.get()
		.then(function(variables) {
			var apiDomain = _.get(variables, "eventHandler.variables.apiDomain", "");
			var namespace = _.get(variables, "eventHandler.variables.namespace", "");

			var reqOptions = {
				url: apiDomain + (apiDomain.endsWith("/") ? "" : "/") + namespace + "/" + path,
				method: method,
				headers: {
					"owner-key": _.get(variables, "eventHandler.variables.ownerKey"),
					"apikey": _.get(variables, "eventHandler.variables.apikey"),
				},
			};

			if (body) {
				Object.assign(reqOptions, {
					body: body,
					json: true,
				});
			}

			request(reqOptions, function(error, response, b) {
				if (error || !response || response.statusCode >= 400) {
					return d.reject(error || b);
				}

				return d.resolve(b);
			});
		});

	return d.promise;
};
