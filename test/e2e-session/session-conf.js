//Required to use Mocha in Protractor
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var q = require('q');
var RtcommHelper = require('./lib/browser-profile-generator.js');

///Define the users in the session
var session = [{
	browserName: process.env.BROWSER || 'chrome',
	userName: 'testUserOne',
	caller: true
}, {
	browserName: process.env.BROWSER || 'chrome',
	userName: 'testUserTwo'
}];

function establishSessionMeta(capabilities) {
	var USERS = [];
	var promises = [];
	// var defer = q.defer();

	capabilities.forEach(function(cap) {

		cap.USERS = USERS;
		USERS.push(cap.userName);

		promises.push(RtcommHelper.generateBrowserProfile(cap));

	});
	return q.all(promises);
}

exports.config = {
	directConnect: true,
	specs: ['session-spec.js'],

	getMultiCapabilities: function() {
		return establishSessionMeta(session);
	},
	onPrepare: function() {

		global.expect = expect;
		// browser.driver.manage().window().maximize();

		return browser.getProcessedConfig().then(function(config) {
			browser.caller = config.capabilities.caller;
			browser.userName = config.capabilities.userName;
			browser.USERS = config.capabilities.USERS;
		});
	},

	framework: 'mocha',

	mochaOpts: {
		reporter: 'spec',
		timeout: 60000
	}
};
