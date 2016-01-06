(function() {

    'use strict';
    angular
        .module('sample-app', ['angular-rtcomm'])
        .controller('SessionController', SessionController);
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
