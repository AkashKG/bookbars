var app = angular.module('ProfileViewCtrl', []).controller(
		'ProfileViewController',
		function($rootScope, $scope, userService, $routeParams) {
			userService.getUserById($routeParams.userId).then(
					function(data, err) {
						$scope.userInfo = data.data;
						console.log($scope.userInfo);
					});

		});