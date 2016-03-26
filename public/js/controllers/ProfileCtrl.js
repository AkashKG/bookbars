angular.module('ProfileCtrl', []).controller(
		'ProfileController',
		function($scope, $rootScope, $http, $location, userService,
				dialogFactory) {
			/*
			 * $http.get('api/v1/me').success(function(data) {
			 * $rootScope.userData = data; console.log(data);
			 * }).error(function(data) { console.log('Error: ' + data); });
			 */
			userService.getUser().then(function(data, err) {
				$rootScope.userData = data.data;
			});

			setTimeout(function() {
				$scope.$emit('ProfileController');
			}, 0);

			$scope.request = [ {
				name : "As a Man Thinketh",
				detail : " - James Allen",
				cover : "./images/books/thinketh1.jpg",

			}, {
				name : "The Great Gatsby",
				detail : " -  F. Scott Fitzgerald",
				cover : "./images/books/Gatsby.jpg",

			} ];
			$scope.accept = [ {
				name : "War and Peace",
				detail : " - Leo Tolstoy",
				cover : "./images/books/War.jpg",

			} ];
			$scope.updateData = function() {
				$http.put('/api/v1/update/' + $rootScope.userData.user._id,
						$rootScope.userData.user.profile).success(
						function(data) {
							console.log(data);
						}).error(function(data) {
					console.log(data);
				})

				$location.path('/profile');

				dialogFactory.showToast("Bingo! Profile was updated.");
			}
			$rootScope.activity = [ {
				title : "Added Life of pi"
			}, {
				title : "Added the turinig point"
			}, {
				title : "Added the pointing tale"
			} ]

		});