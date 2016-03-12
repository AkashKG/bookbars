angular.module('ShowbookCtrl', []).controller('ShowbookController', function($scope, $location, $window, $http) {

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
	 $scope.myDate = new Date();
		$scope.addbookData={
				bookname:null,
				author:null,
				publisher:null,
				isbn:null,
				edition:null,
				date: $scope.myDate,
				status:null
		}
		
		 $scope.maxDate = new Date(
			      $scope.myDate.getFullYear(),
			      $scope.myDate.getMonth(),
			      $scope.myDate.getDate());
		
	$scope.addBook=function(){
		$http.post('/api/v1/product/addbook', $scope.addbookData)
        .success(function(data) {
            $scope.addbookData = {}; 
            $scope.book = data;
            console.log($scope.book);
        })
        .error(function(data) {
        	 $scope.addbookData = {};
            console.log('Error: ' + data);
        });
			
		
	};
	});