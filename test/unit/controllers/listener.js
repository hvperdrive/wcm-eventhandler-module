require("rootpath")();
var _ = require("lodash");
var Q = require("q");
var expect = require("chai").expect;
var assert = require("chai").assert;
var proxyquire = require("proxyquire").noPreserveCache().noCallThru();
var configMock = require("test/helpers/config");
var emitterMock = require("test/helpers/emitter");
var eventsMock = require("test/mocks/events");
var contentNewsItemMock = require("test/mocks/contentNewsItemMock");

require("rewire-global").enable();

var listener = proxyquire("app/controllers/listener", {
	"config": configMock,
	"app/middleware/emitter": emitterMock,
	"../helpers/eventRequest": function eventRequest() {
		return Q.when(arguments);
	},
});

describe("ListenerController", function() {

	describe("parseConfig", function() {
		it("Should map the config correctly", function() {
			var parseConfig = listener.__get__("parseConfig");
			var result = parseConfig(eventsMock());

			expect(result).to.be.an("object");

			expect(result.contentUpdated).to.be.an("array");
			expect(result.contentUpdated.length).to.be.greaterThan(0);
			expect(result.contentUpdated[0].filter).to.be.an("function");

			expect(result.menuUpdated).to.be.an("array");
			expect(result.menuUpdated.length).to.be.greaterThan(0);
			expect(result.menuUpdated[0].filter).to.be.undefined;
		});
	});

	describe("registerListeners", function() {
		beforeEach(function() {
			emitterMock.removeAllListeners();
		});

		it("Should listen on 5 events when events mock is passed", function() {
			var registerListeners = listener.__get__("registerListeners");

			registerListeners.call(listener);

			expect(emitterMock.listenersAny()).to.be.an("array");
			expect(emitterMock.listenersAny()).to.have.length(1);
		});
	});

	describe("getRequiredEvents", function() {
		it("Should return one required event to emit", function() {
			var getRequiredEvents = listener.__get__("getRequiredEvents");
			var parseConfig = listener.__get__("parseConfig");

			// Mock required this data
			this.config = parseConfig(eventsMock());

			var result = getRequiredEvents.call(this, "contentUpdated", contentNewsItemMock());

			expect(result).to.be.an("array");
			expect(result).to.have.length(1);
			expect(result[0].topic).to.be.equal("news_updated");

		});

		it("Should return no required events to emit when none is specified", function() {
			var getRequiredEvents = listener.__get__("getRequiredEvents");
			var parseConfig = listener.__get__("parseConfig");
			var ctMock = contentNewsItemMock();

			// Mock required this data
			this.config = parseConfig(eventsMock());
			_.set(ctMock, "meta.contentType.meta.safeLabel", "news");

			var result = getRequiredEvents.call(this, "contentUpdated", ctMock);

			expect(result).to.be.an("array");
			expect(result).to.have.length(0);
		});
	});

	describe("sendEvent", function() {
		it("Should send an event", function() {
			var sendEvent = listener.__get__("sendEvent");

			return sendEvent({ topic: "news_updated" }, contentNewsItemMock())
				.then(function(args) {
					expect(typeof args).to.equal("object");
					expect(args[0]).to.equal("PUT");
					expect(args[1]).to.equal("test_news_updated/publish");
					expect(args[2]).to.eql(contentNewsItemMock());
				}, function() {
					assert.fail("Error", "Success", "sendEvent should have succeeded but failed.");
				});
		});
	});

	describe("removeListeners", function() {
		beforeEach(function() {
			emitterMock.removeAllListeners();
		});
		it("Should remove all the listeners registered", function() {
			expect(emitterMock.listenersAny().length).to.be.greaterThan(0);

			listener.removeListeners();

			expect(emitterMock.listenersAny()).to.be.an("array");
			expect(emitterMock.listenersAny()).to.have.length(0);
		});
	});
});
