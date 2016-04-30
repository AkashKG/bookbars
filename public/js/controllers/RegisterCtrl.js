angular
		.module('RegisterCtrl', [])
		.controller(
				'RegisterController',
				function($scope, $location, authFactory) {

					// $scope.tagline = 'The square root of life is pi!';
					$scope.regUsers = [ {
						username : 'akashkg',
						email : 'xyz@abc.com',
						password : 'atul',
						firstName : 'Akash',
						lastName : 'Gupta',
						phoneNumber : 'XXX'
					}, ]
					$scope.registerData = {
						username : null,
						email : null,
						password : null,
						firstName : null,
						lastName : null,
						phoneNumber : null,
						confirmPassword : null
					}
					// $scope.confirmPassword=null;
					$scope.err = false;

					$scope.Register = function() {

						authFactory.register($scope.registerData.email,
								$scope.registerData.password)
						.then(function() {
									$location.path('/');
									$scope.registerData={};
						})
						.catch(function () {
					          console.log("Something went wrong!");
					          $scope.registerData = {};
					    });

						if ($scope.registerData.password !== null
								&& $scope.registerData.confirmPassword !== null
								&& $scope.registerData.confirmPassword === $scope.registerData.password) {
							$scope.regUsers.push($scope.registerData);
							$location.path('/profile');
						}
						if ($scope.registerData.password !== null
								&& $scope.registerData.confirmPassword !== null
								&& $scope.registerData.confirmPassword !== $scope.registerData.password) {
							$scope.err = true;
						}
					};
				});