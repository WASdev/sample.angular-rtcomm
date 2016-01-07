(function() {

    'use strict';
    angular
        .module('sample-app', ['angular-rtcomm'])
        .run(rtcommAppInit)
        .factory('rtcommConfig', rtcommConfig)
        .controller('SessionController', SessionController)
        .controller('ModalController', ModalController);

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

    SessionController.$inject = ['$scope', 'RtcommService', '$log', '$modal'];

    function SessionController($scope, RtcommService, $log, $modal) {
        var session = this;
        var endpoint;

        session.connected = false;
        session.openModal = openModal;
        session.connect = connect;
        session.disconnect = disconnect;

        function openModal() {
            var options = {
                animation: true,
                controller: 'ModalController as modal',
                templateUrl: 'connectModal.html'
            };
            var modalInstance = $modal.open(options);

            modalInstance.result.then(function(callee) {
                session.connect(callee);
            });

        }

        function connect(callee) {
            RtcommService.placeCall(callee, ['webrtc', 'chat']);
        }

        function disconnect() {

            $log.debug('sample-app - Disconnecting...');
            endpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());
            endpoint.disconnect();
            $log.debug('sample-app - Disconnected.');
        }

        //Listen for event broadcasted when rtcomm endpoint is initialized (registered)
        $scope.$on('rtcomm::init', function(event, success, details) {
            if (success === true) {
                session.registered = true;
            } else {
                session.registered = false;
            }
        });

        $scope.$on('session:stopped', function(){
          session.connected = false;
        })
        $scope.$on('sesssion:started', function(){
          session.connected = true;
        })
    }

    ModalController.$inject = ['$scope', '$modalInstance'];

    function ModalController($scope, $modalInstance) {
        var modal = this;
        modal.callee ='';
        modal.ok = function() {
            $modalInstance.close(modal.callee);
        };
        modal.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
})();
