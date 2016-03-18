angular.module('ShowbookCtrl', []).controller('ShowbookController', function($scope,$rootScope, $location, $window, $http, $mdDialog, dialogFactory) {

	$scope.items=[{
		id:null,
		name:null,
		detail:null,
		cover:null
	}];
	
	$scope.gotoBook=function(id, ev){
		

		for(var i=0;i<$scope.books.products.length;i++){
			if(id == $scope.books.products[i]._id){
				$scope.items = $scope.books.products[i];
				dialogFactory
				.showAlert(
						"Book Details [Development]",
						
						 $scope.items.name + " - " + $scope.items.author + "  |  " + "ISBN : " + $scope.items.isbn + "   |   " + "Edition : " + $scope.items.edition );
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
            $scope.addbookData = null; 
            $location.path('/profile');
            $scope.book = data;
            console.log($scope.book);
        })
        .error(function(data) {
        	 $scope.addbookData = {};
            console.log('Error: ' + data);
        });
	};
	$scope.deleteBook=function(id){
		$http.delete('/api/v1/product/delete/'+id).success(function(data){
			$rootScope.books = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
		$http.get('/api/v1/product/category/Students').success(function(data) {
			$rootScope.books = data;
			console.log(data);
			console.log(data.products.name);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		
	});