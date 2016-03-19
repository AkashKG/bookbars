angular.module('ProfileCtrl', []).controller('ProfileController',
		function($scope, $rootScope, $http, $location) {
			$http.get('api/v1/me').success(function(data) {
				$rootScope.userData = data;
			}).error(function(data) {
				console.log('Error: ' + data);
			});

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
			$rootScope.activity = [ {
				title : "Added Life of pi"
			}, {
				title : "Added the turinig point"
			}, {
				title : "Added the pointing tale"
			} ]

		});