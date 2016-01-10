(function() {

    'use strict';

    angular
        .module('sample-app', ['angular-rtcomm'])
        .controller('SessionController', SessionController)
        .controller('ModalController', ModalController);

    SessionController.$inject = ['$scope', 'RtcommService', '$log', '$modal'];

    /**
     * [Controller maintains the state of the session as well as carry out calls,
     * listen for state changes]
     * @param {[type]} $scope        [Controller scope]
     * @param {[type]} RtcommService [RtcommService is the main service from the angular-rtcomm, contains features such as placing calls programmatically  ]
     * @param {[type]} $log          [AngularJS Logger]
     * @param {[type]} $modal        [Angular-Bootstrap modal service]
     */
    function SessionController($scope, RtcommService, $log, $modal) {
        var session = this;

        session.registered = false;
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
            var endpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());
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
        });
        $scope.$on('session:started', function(){
          session.connected = true;
        });
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
