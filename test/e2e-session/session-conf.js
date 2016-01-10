
//Required to use Mocha in Protractor
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

///Define the users in the session
var session = [{
    browserName: 'chrome',
    userName: 'testUserOne',
    caller : true
  }, {
    browserName: 'chrome',
    userName: 'testUserTwo'
}];

var chromeFlags = {
    'args': ['--start-maximized',
        '--allow-file-access-from-files',
        '--disable-gesture-requirement-for-media-playback',
        '--allow-file-access',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
                    '--start-maximized'
    ]
}

function establishSessionMeta(capabilities){
  var USERS = [];
  capabilities.forEach(function(cap, index){

    cap.USERS = USERS;
    USERS.push(cap.userName);

    if(cap.browserName === 'chrome'){
      cap.chromeOptions = chromeFlags;
    }

    //TODO Add Firefox Clients

  });

  return capabilities;
}

var caps = establishSessionMeta(session);

exports.config = {
    directConnect: true,
    specs: ['session-spec.js'],

    multiCapabilities: caps,

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
}
