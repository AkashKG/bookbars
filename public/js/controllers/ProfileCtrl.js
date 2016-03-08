angular.module('ProfileCtrl', []).controller('ProfileController',
		function($scope, $http) {
			$http.get('api/v1/me').success(function(data) {
				$scope.userData = data;
				console.log($scope.userData);
			}).error(function(data) {
				console.log('Error: ' + data);
			});
			$scope.book_repo = [ {
				name : "As a Man Thinketh",
				detail : " - James Allen",
				cover : "./images/books/thinketh1.jpg",

			}, {
				name : "Drive",
				detail : " - Daniel Pink",
				cover : "./images/books/drive.jpg",

			}, {
				name : "Anna Karenina",
				detail : " - Leo Tolstoy",
				cover : "./images/books/anna.jpg",

			}, {
				name : "The Great Gatsby",
				detail : " -  F. Scott Fitzgerald",
				cover : "./images/books/Gatsby.jpg",

			} ];

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
			
				
			

		});