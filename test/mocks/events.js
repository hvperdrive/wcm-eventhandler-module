var _ = require("lodash");

module.exports = function() {
	return _.cloneDeep([{
		"_id": "598872b59b3ebf5f0ac05465",
		"meta": {
			"label": "News",
			"safeLabel": "news",
			"lastModified": "2017-08-07T14:01:25.173+0000",
			"created": "2017-08-07T14:01:25.173+0000",
			"source": "content",
		},
		"data": {
			"contentType": {
				"_id": "593a9747aef3a98476c03aa0",
				"versions": [],
				"fields": [
					{
						"dataType": "string",
						"operators": [
							{
								"value": "equals",
								"label": "Equals",
							},
							{
								"value": "i",
								"label": "Contains",
							},
							{
								"value": "^",
								"label": "Starts with",
							},
							{
								"value": "$",
								"label": "Ends with",
							},
						],
						"label": "Title",
						"type": "text",
						"validation": {
							"required": true,
						},
						"_id": "title",
						"indexed": false,
						"multiLanguage": true,
						"options": [

						],
						"max": 1,
						"min": 1,
						"taxonomyLists": [

						],
						"uuid": "d0867c8c-ac1a-48f5-b919-37d7845b450f",
					},
					{
						"dataType": "file",
						"minimagewidth": 1500,
						"minimageheight": 400,
						"label": "Banner",
						"type": "image",
						"validation": {
							"required": true,
						},
						"_id": "banner",
						"indexed": false,
						"multiLanguage": false,
						"options": [

						],
						"max": 1,
						"min": 1,
						"taxonomyLists": [

						],
						"uuid": "e50a9a21-3e6a-46a4-862a-a96d1c247b31",
					},
					{
						"dataType": "string",
						"operators": [
							{
								"value": "equals",
								"label": "Equals",
							},
							{
								"value": "i",
								"label": "Contains",
							},
							{
								"value": "^",
								"label": "Starts with",
							},
							{
								"value": "$",
								"label": "Ends with",
							},
						],
						"label": "Intro",
						"type": "textarea",
						"validation": {
							"required": true,
						},
						"_id": "intro",
						"indexed": false,
						"multiLanguage": true,
						"options": [

						],
						"max": 1,
						"min": 1,
						"taxonomyLists": [

						],
						"uuid": "2b1be831-6610-4e43-82ac-bbc369a48605",
					},
					{
						"dataType": "string",
						"operators": [
							{
								"value": "equals",
								"label": "Equals",
							},
							{
								"value": "i",
								"label": "Contains",
							},
							{
								"value": "^",
								"label": "Starts with",
							},
							{
								"value": "$",
								"label": "Ends with",
							},
						],
						"label": "Body",
						"type": "richtext",
						"validation": {
							"required": true,
						},
						"_id": "body",
						"indexed": false,
						"multiLanguage": true,
						"options": [

						],
						"max": 1,
						"min": 1,
						"taxonomyLists": [

						],
						"uuid": "1b231d68-bf23-4c39-ad45-5276865352c2",
					},
					{
						"dataType": "file",
						"minimagewidth": 500,
						"minimageheight": 500,
						"label": "Thumbnail",
						"type": "image",
						"validation": {
							"required": true,
						},
						"_id": "thumbnail",
						"indexed": false,
						"multiLanguage": false,
						"options": [

						],
						"max": 1,
						"min": 1,
						"taxonomyLists": [

						],
						"uuid": "637ba4e4-427d-4556-ae36-3db445c73af0",
					},
					{
						"dataType": "object",
						"operators": [
							{
								"value": "is",
								"label": "Is",
							},
							{
								"value": "is not",
								"label": "Is not",
							},
						],
						"label": "Exclude from home",
						"type": "checkbox",
						"validation": {
							"required": false,
						},
						"_id": "excludeFromHome",
						"indexed": false,
						"multiLanguage": false,
						"options": [
							{
								"key": "exclude",
								"label": "Exclude",
								"_id": "593fd203aef3a98476c03c57",
							},
						],
						"max": 1,
						"min": 1,
						"taxonomyLists": [

						],
						"uuid": "46a427e4-3f8b-4d60-92f6-102452e2a831",
					},
				],
				"meta": {
					"created": "2017-06-09T12:40:39.522+0000",
					"lastModified": "2017-06-13T11:52:35.813+0000",
					"taxonomy": {
						"available": [
							"5782bb27-f482-40d3-bbd0-4fe36fb033d8",
						],
						"fieldType": "Taxonomy",
						"tags": [

						],
					},
					"hitCount": 0,
					"deleted": false,
					"canBeFiltered": true,
					"lastEditor": "592821657f683db14239285f",
					"safeLabel": "news_item",
					"description": "A page type for a news item.",
					"label": "News item",
				},
				"uuid": "0952a9c8-c317-43d5-add3-aa345cd6fcfa",
				"__v": 0,
			},
			"events": [
				{
					"name": "contentUpdated",
					"topic": "news_updated",
					"_id": "598872b59b3ebf5f0ac05468",
				},
				{
					"name": "contentCreated",
					"topic": "news_created",
					"_id": "598872b59b3ebf5f0ac05467",
				},
				{
					"name": "contentRemoved",
					"topic": "news_removed",
					"_id": "598872b59b3ebf5f0ac05466",
				},
			],
		},
		"uuid": "4791f211-9ef1-4fe6-b633-f7cb49484444",
		"__v": 0,
	},
	{
		"_id": "5989832e540c0a4f8ee4a75e",
		"meta": {
			"label": "menu test",
			"safeLabel": "menu_test",
			"lastModified": "2017-08-08T09:23:58.326+0000",
			"created": "2017-08-08T09:23:58.326+0000",
			"source": "menu",
		},
		"data": {
			"events": [
				{
					"name": "menuCreated",
					"topic": "menu_created",
					"_id": "5989832e540c0a4f8ee4a760",
				},
				{
					"name": "menuUpdated",
					"topic": "menu_updated",
					"_id": "5989832e540c0a4f8ee4a75f",
				},
			],
		},
		"uuid": "e1fcc649-3c4c-4acd-bb60-e16f7b557aeb",
		"__v": 0,
	}]);
};
