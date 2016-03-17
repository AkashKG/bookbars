angular.module('ShowbookCtrl', []).controller('ShowbookController', function($scope, $location, $window, $http) {

	$scope.items=[{
		id:null,
		name:null,
		detail:null,
		cover:null
	}];
	$scope.gotoBook=function(id){
		for(var i=0;i<$scope.books.products.length;i++){
			if(id == $scope.books.products[i]._id){
				$scope.items = $scope.books.products[i];
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
				status:null,
				picture:null,
				category:'Books',
				
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
	
		$http.get('/api/v1/product/category/Students').success(function(data) {
			$scope.books = data;
			console.log(data);
			console.log(data.products.name);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	
	});