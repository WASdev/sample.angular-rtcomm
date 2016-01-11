/*eslint-env node*/

//------------------------------------------------------------------------------
// Mosca app for node.js
//------------------------------------------------------------------------------
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv'),
	mosca = require('mosca'),
	bunyan = require('bunyan');


var appEnv = cfenv.getAppEnv();

var log = bunyan.createLogger({
	name: 'MqttServer',
	level: 'info'
});


var port = appEnv.isLocal ? 3000 : cfenv.getAppEnv().port;
var host = appEnv.isLocal ? 'localhost' : cfenv.getAppEnv().bind;

/**
 * Settings that will be used to startup the MQTT Broker
 *
 * @type {Object}
 */
var settings = {
	persistence: {
		factory: mosca.persistence.Memory
	},
	host: host,
	logger: {
		level: 'info'
	},
	http: {
		port: port,
		bundle: true,
		static: './public'
	}
};

var server = new mosca.Server(settings, function(error) {
	log.debug("Started on " + cfenv.getAppEnv().url + " message: " + error);
});

server.on('clientConnected', function(client) {
	log.debug('client connected', client.id);
});

server.on('published', function(packet) {
	// console.log('Published', packet);
	log.debug('Published', packet.payload.toString());
});

server.on('subscribed', function(topic, client) {
	log.debug('Subscribed: ' + topic + ' client:' + client);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
	log.info('Mosca server is up and running');
	log.info('Access the Sample App at: http://%s:%s', host, port);
}
