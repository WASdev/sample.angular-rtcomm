(function() {

    'use strict';
    angular
        .module('sample-app', ['angular-rtcomm'])
        .run(rtcommAppInit)
        .factory('rtcommConfig', rtcommConfig)
        .controller('SessionController', SessionController);

    rtcommAppInit.$inject = ['rtcommConfig'];

    function rtcommAppInit(rtcommConfig) {

      rtcommConfig.initialize();
    }

    rtcommConfig.$inject = ['RtcommService', '$log'];

    function rtcommConfig(RtcommService, $log) {
        var service = {
            initialize : initialize
        };

        return service;
        /////////////////////////

        function initialize(){
          var config = {
              "server": window.location.hostname || 'localhost',
              "port": window.location.port || 80,
              "rtcommTopicPath": "/rtcomm/",
              "createEndpoint": true,
              "presenceTopic": "sampleRoom",
              "userid": ""
          };

          RtcommService.setConfig(config);

        }
    }

    SessionController.$inject = ['RtcommService', '$log'];

    function SessionController(RtcommService, $log) {
        var session = this;
        var endpoint;

        session.disconnect = disconnect;

        function disconnect() {

            $log.debug('sample-app - Disconnecting...');
            endpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());
            endpoint.disconnect();
            $log.debug('sample-app - Disconnected.');
        }
    }
})();
