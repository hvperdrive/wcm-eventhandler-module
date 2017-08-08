var _ = require("lodash");

module.exports = function() {
	return _.cloneDeep([{
		"_id" : "598872b59b3ebf5f0ac05465",
		"meta" : {
			"label" : "News",
			"safeLabel" : "news",
			"lastModified" : "2017-08-07T14:01:25.173+0000",
			"created" : "2017-08-07T14:01:25.173+0000",
			"source" : "content",
		},
		"data" : {
			"contentType" : "593a9747aef3a98476c03aa0",
			"events" : [
				{
					"name" : "contentUpdated",
					"topic" : "news_updated",
					"_id" : "598872b59b3ebf5f0ac05468",
				},
				{
					"name" : "contentCreated",
					"topic" : "news_created",
					"_id" : "598872b59b3ebf5f0ac05467",
				},
				{
					"name" : "contentRemoved",
					"topic" : "news_removed",
					"_id" : "598872b59b3ebf5f0ac05466",
				},
			],
		},
		"uuid" : "4791f211-9ef1-4fe6-b633-f7cb49484444",
		"__v" : 0,
	},
	{
		"_id" : "5989832e540c0a4f8ee4a75e",
		"meta" : {
			"label" : "menu test",
			"safeLabel" : "menu_test",
			"lastModified" : "2017-08-08T09:23:58.326+0000",
			"created" : "2017-08-08T09:23:58.326+0000",
			"source" : "menu",
		},
		"data" : {
			"events" : [
				{
					"name" : "menuCreated",
					"topic" : "menu_created",
					"_id" : "5989832e540c0a4f8ee4a760",
				},
				{
					"name" : "menuUpdated",
					"topic" : "menu_updated",
					"_id" : "5989832e540c0a4f8ee4a75f",
				},
			],
		},
		"uuid" : "e1fcc649-3c4c-4acd-bb60-e16f7b557aeb",
		"__v" : 0,
	}]);
};
