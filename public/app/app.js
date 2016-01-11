
/*global angular */
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

		var vm = this;

		vm.activeEndpoint = null;
		vm.registered = false;
		vm.connected = false;
		vm.openModal = openModal;
		vm.connect = connect;
		vm.disconnect = disconnect;


		function openModal() {
			var options = {
				animation: true,
				controller: 'ModalController as vm',
				templateUrl: 'connectModal.html'
			};
			var modalInstance = $modal.open(options);

			modalInstance.result.then(function(callee) {
				vm.connect(callee);
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
		$scope.$on('rtcomm::init', function(event, success) {
			if (success === true) {
				vm.registered = true;
			} else {
				vm.registered = false;
			}
		});

		$scope.$on('session:stopped', function() {
			vm.connected = false;
		});

		$scope.$on('session:started', function() {
			vm.endpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());

			vm.connected = true;
		});

		$scope.$on('session:trying', function() {
			if (vm.connected === true) {

				vm.endpoint.disconnect();
			}
		});

	}

	ModalController.$inject = ['$scope', '$modalInstance'];

	function ModalController($scope, $modalInstance) {
		var vm = this;
		vm.callee = '';
		vm.ok = function() {
			$modalInstance.close(vm.callee);
		};
		vm.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}
})();
