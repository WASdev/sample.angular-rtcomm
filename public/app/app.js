    angular
    .module('sample-app', ['angular-rtcomm'])
    .controller('SessionController', SessionController)
    SessionController.$inject = ['RtcommService', '$log'];

    function SessionController(RtcommService, $log) {
        var vm = this;
        var endpoint;

        vm.disconnect = disconnect;

        function disconnect() {
            endpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());
            $log.debug('sample-app => Disconnecting...');
            endpoint.disconnect();
            $log.debug('sample-app => Disconnected.');
        }
    }
