var SamplePage = require('./sample-page.js');

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(6000);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Sample App for angular-rtcomm Test', function() {

    var client = new SamplePage();
    beforeEach(function() {
        client.get('http://localhost:3000');
    })

    afterEach(function() {
        client.sleep(2000);
    });

    it('should be able to register a user successfully', function() {

        client.enterName(browser.userName);
        expect(client.registerInput.getAttribute('value')).to.eventually.equal(browser.userName);

        client.register();
        expect(client.registerInput.getAttribute('value')).to.eventually.equal(browser.userName);
        expect(client.registerBtn.getText()).to.eventually.equal('Unregister');

    })
    it('should be able to establish a session between users by using presence', function() {

        client.enterName(browser.userName);
        client.register();

        if (browser.caller) {
            client.sleep(1000);
            var callee = browser.USERS[1];

            client.callThroughPresence(callee);
        } else {
            client.waitForCallerAlertModal(5000);
            client.acceptCall();
        }

        //Expect the video feed to be on
        expect(client.waitForVideoReady('#selfView', 5000)).to.eventually.equal(4);
        expect(client.waitForVideoReady('#remoteView', 5000)).to.eventually.equal(4);

        browser.sleep(7000); //Let Video play for a bit
    });

    it('should be able to establish a session between users by using the connect button', function() {

        client.enterName(browser.userName);
        client.register();


        if (browser.caller) {
            var callee = browser.USERS[1];

            client.openConnectModal(5000);
            client.enterCalleeName(callee);
            client.call();
        } else {
            client.waitForCallerAlertModal(10000);
            client.acceptCall();
        }

        //Expect the video feed to be on
        expect(client.waitForVideoReady('#selfView', 5000)).to.eventually.equal(4);
        expect(client.waitForVideoReady('#remoteView', 5000)).to.eventually.equal(4);

        browser.sleep(7000); //Let Video play for a bit



    });


})
