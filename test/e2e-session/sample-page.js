/**
 * This sample-page.js file represents the Sample App web-page as an Object,
 * this helps writes clearer tests and focuses more on the user actions
 * over what elements to find by using WebDriver/Protractor
 */
var EC = protractor.ExpectedConditions;

var SamplePage = function() {

	var client = this;

	client.registerInput = element(by.id('register-input')); //Register Input Field
	client.registerBtn = element(by.id('btn-register')); //Register Button
	client.dialogBtn = $('[ng-click="ok()"]'); //Dialog Button

	client.connectBtn = element(by.id('sessionConnectBtn')); //Connect Button
	client.disconnectBtn = element(by.id('sessionDCBtn')); //Disconnect Button

	/**
	 * [The client enters the specified url]
	 * @param  {[type]} url [Url that the browser should point to]
	 */
	client.get = function(url) {
		browser.get(url);
	};
	/**
	 * [Types the given userName to the register input field]
	 * @param  {[type]} userName [the user name that should be typed into the input field]
	 */
	client.enterName = function(userName) {
		client.registerInput.sendKeys(userName);
	};

	client.register = function() {
		client.registerBtn.click();
	};

	client.callThroughPresence = function(user) {

		var presenceBtn = browser.driver.findElement(By.xpath("//span[text()=' " + user + " ']/preceding-sibling::button"));
		presenceBtn.click();

	};

	client.waitForCallerAlertModal = function(_ms, _msg) {
		var ms = _ms || 5000;
		var msg = _msg || "Timed out waiting for caller alert modal!";


		var condition = EC.elementToBeClickable(client.dialogBtn);

		browser.wait(condition, ms, msg);
	};

	client.acceptCall = function() {
		client.dialogBtn.click();
	};

	client.waitForVideoReady = function(selector, _ms, _msg) {

		var msg = _msg || "Timed out while retrieving video state";
		var ms = _ms || 5000;

		var script = function(selector) {
			var callback = arguments[arguments.length - 1];

			try {

				var video = document.querySelector(selector);
				if (video.readyState === 4) {
					callback(video.readyState);
				} else {
					video.onloadeddata = function() {
						if (video.readyState === 4) {
							callback(video.readyState);
						}
					};
				}

			} catch (err) {
				callback(-1);
			}
		};

		return browser.driver.wait(browser.driver.executeAsyncScript(script, [selector]), ms, msg);

	};

	client.waitForConnectModal = function(_ms, _msg) {
		var ms = _ms || 5000;
		var msg = _msg || "Waited too long for 'Connect' button to be enabled";

		var inputText = element(by.css('[ng-model="vm.callee"]'));


		var condition = EC.elementToBeClickable(client.connectBtn);
		var modalCondition = EC.elementToBeClickable(inputText);
		browser.wait(condition, ms, msg).then(function() {
			client.connectBtn.click();
		});
		browser.wait(modalCondition, ms, "Waited too long for 'Connect' modal to show up");
	};

	client.enterCalleeName = function(name) {

		//Wait for dialog to show up and enter the name

		var inputText = element(by.css('[ng-model="vm.callee"]'));
		inputText.sendKeys(name);

	};

	client.call = function() {
		var connectCallBtn = element(by.css('[ng-click="vm.ok()"]'));

		connectCallBtn.click();

	};
	client.sleep = function(ms) {
		browser.sleep(ms);
	};
};

module.exports = SamplePage;
