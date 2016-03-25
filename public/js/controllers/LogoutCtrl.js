angular.module('LogoutCtrl', []).controller('LogoutController',
		function($scope, $location, authFactory, $rootScope) {

			$scope.logout = function() {
				$rootScope.isLoggedIn = false;
				authFactory.logout().then(function() {
					$location.path('/login');
				});

			};
		});