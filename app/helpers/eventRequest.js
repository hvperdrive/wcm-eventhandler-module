const Q = require("q");
const _ = require("lodash");
const request = require("request");

const variablesHelper = require("../helpers/variables");

module.exports = (method, path, body) => {
	const d = Q.defer();

	console.log('SEND AN EVENT :pray:')

	variablesHelper.get().then((variables) => {
		const apiDomain = _.get(variables, "publicContract.variables.apiDomain", "");
		const namespace = _.get(variables, "publicContract.variables.namespace", "wcm");
		const apikey = _.get(variables, "publicContract.variables.apikey", "");
		const ownerKey = _.get(variables, "publicContract.variables.ownerKey", "");

		const reqOptions = {
			url: apiDomain + (apiDomain.endsWith("/") ? "" : "/") + "namespaces/" + namespace + "/topics/" + path,
			method: method,
			headers: {
				"apikey": apikey,
				"owner-key": ownerKey
			},
		};

		if (body) {
			Object.assign(reqOptions, {
				body: body,
				json: true,
			});
		}

		request(reqOptions, (error, response, b) => {
			if (error || !response || response.statusCode >= 400) {
				return d.reject(error || b);
			}

			return d.resolve(b);
		});
	})
		.catch(d.reject);

	return d.promise;
};
