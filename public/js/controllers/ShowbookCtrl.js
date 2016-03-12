angular.module('ShowbookCtrl', []).controller('ShowbookController', function($scope, $location, $window) {

	$scope.book_repo = [ {
		id : "1",
		name : "As a Man Thinketh",
		detail : " - James Allen",
		cover : "./images/books/thinketh1.jpg",

	}, {
		id : "2",
		name : "Drive",
		detail : " - Daniel Pink",
		cover : "./images/books/drive.jpg",

	}, {
		id : "3",
		name : "Anna Karenina",
		detail : " - Leo Tolstoy",
		cover : "./images/books/anna.jpg",

	}, {
		id : "4",
		name : "The Great Gatsby",
		detail : " -  F. Scott Fitzgerald",
		cover : "./images/books/Gatsby.jpg",

	} ];
	$scope.items=[{
		id:null,
		name:null,
		detail:null,
		cover:null
	}];
	$scope.gotoBook=function(id){
		for(var i=0;i<$scope.book_repo.length;i++){
			if(id == $scope.book_repo[i].id){
				$scope.items = $scope.book_repo[i];
				break;
			}
		
		}
	};
        
	});