angular.module('ProfileCtrl', []).controller('ProfileController',
		function($scope) {

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
			$scope.loginData={
					username:'tushar_sinha',
					email:'tshina@bbarter.com',
					firstName:'Tushar',
					lastName:'Sinha',
					nearestLocality:'KIITU,',
					city:'Bhubaneswar',
					pin:'751024'
			}

		});