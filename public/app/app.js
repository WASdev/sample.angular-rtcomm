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
            initialize: initialize
        };

        return service;
        /////////////////////////

        function initialize() {
            var config = {
                "server": window.location.hostname || 'localhost',
                "port": window.location.port || 80,
                "rtcommTopicPath": "/rtcomm/",
                "presenceTopic": "sampleRoom",
                "userid": ""
            };

            //Set configuration
            RtcommService.setConfig(config);

        }
    }

    SessionController.$inject = ['$scope', 'RtcommService', '$log'];

    function SessionController($scope, RtcommService, $log) {
        var session = this;
        var endpoint;

        session.connected = false;
        session.disconnect = disconnect;

        function disconnect() {

            $log.debug('sample-app - Disconnecting...');
            endpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());
            endpoint.disconnect();
            $log.debug('sample-app - Disconnected.');
        }

        //Listen for event broadcasted when rtcomm endpoint is initialized (registered)
        $scope.$on('rtcomm::init', function(event, success, details){
            if(success == true){
              session.connected = true;
            }
            else{
              session.connected = false;
            }
        })
    }
})();
