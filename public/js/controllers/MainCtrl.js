angular
		.module('MainCtrl', [])
		.controller(
				'MainController',
				function($scope, $timeout, $mdSidenav, $log, $mdDialog,
						$location, $rootScope) {
										$scope.aboutIcons = [ {
						icon : 'search',
						name : 'Search'
					}, {
						icon : 'shuffle',
						name : 'Exchange'
					}, {
						icon : 'book',
						name : 'Grow'
					} ];
										$scope.loginData = {
						username : null,
						password : null
					}

					$scope.regUsers = [ {
						username : 'atul',
						password : 'avc'
					} ]

					$scope.login = function() {

						for (var i = 0; i < $scope.regUsers.length; i++) {
							if ($scope.regUsers[i].username === $scope.loginData.username) {
								if ($scope.regUsers[i].password === $scope.loginData.password) {
									$location.path('/profile');
									rootScope.isLoggedIn = 'true';
								}
							}
						}
					}

					$rootScope.logout = function() {
						$location.path('/');
						$rootScope.isLoggedIn = '';
					};

				})