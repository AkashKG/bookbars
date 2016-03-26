angular.module('MyCartCtrl', []).controller('MyCartController',
		function($scope, userService, $http, dialogFactory) {
			userService.getUser().then(function(data, err) {
				$scope.user = data.data.user;
				$scope.tradedBooks = data.data.user.profile.booksTradedByOwner;
				console.log(data);
			})
			
			$scope.requestDelete=function(id){
				$http.delete('/api/v1/user/update/deleterequest/' + $scope.user._id + '/' + id).success(function(data){
					dialogFactory.showToast("Reqest altered successfully");
					userService.getUser().then(function(data, err) {
						$scope.user = data.data.user;
						$scope.tradedBooks = data.data.user.profile.booksTradedByOwner;
						console.log(data);
					});
				});
			};

		});