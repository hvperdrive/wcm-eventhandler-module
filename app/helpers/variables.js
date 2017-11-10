var Q = require("q");

var VariableHelper = require("@wcm/module-helper").variables;
var packageConfig = require("../../package.json");

var packageInfo = null;

module.exports.get = function getVariables() {
	if (packageInfo === null) {
		return Q.reject("No info set");
	}
	return VariableHelper.getAll(packageConfig.name, packageConfig.version);
};

module.exports.setPackageInfo = function setPackageInfo(info) {
	packageConfig = info;
};

module.exports.getPackageInof = function getPackageInfo() {
	return packageConfig;
};

