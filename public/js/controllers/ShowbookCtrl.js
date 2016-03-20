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
				$scope.showBookDialog(ev);
				// console.log($scope.items);
				/*
				 * dialogFactory .showAlert( "Book Details [Development]",
				 * 
				 * $scope.items.name + " - " + $scope.items.author + " | " +
				 * "ISBN : " + $scope.items.isbn + " | " + "Edition : " +
				 * $scope.items.edition );
				 * 
				 * 
				 */break;
			}
		
		}
	};
	$scope.showBookDialog=function(ev){
		$mdDialog.show({
			templateUrl : '/views/showbook/showbook.view.html',
			parent : angular.element(document.body),
			targetEvent : ev,
			scope : $scope.$new(),
			clickOutsideToClose : true,
		});
	}
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.hide = function() {
		$mdDialog.cancel();
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
				description: null
				
		}
		
		 $scope.maxDate = new Date(
			      $scope.myDate.getFullYear(),
			      $scope.myDate.getMonth(),
			      $scope.myDate.getDate());
		
	$scope.addBook=function(){
		$http.post('/api/v1/product/addbook', $scope.addbookData)
        .success(function(data) {
            dialogFactory.showToast("The book " + $scope.addbookData.bookname + " was added successfully");
            $scope.addbookData = null; 
            $location.path('/profile');
            $scope.book = data;
            console.log($scope.book);
        })
        .error(function(data) {

            dialogFactory.showToast("ERROR : The book was not added.");
        	 $scope.addbookData = {};
            console.log('Error: ' + data);
        });
	};
	
	$scope.deleteBook = function(id, ev) {
		var confirm = $mdDialog.confirm()
        .title("Delete Book")
        .targetEvent(ev)
        .content('Are You sure you want to delete the book?')
        .ariaLabel('Delete')
        .ok("Delete")
        .cancel('Cancel');
		$mdDialog.show(confirm).then(function(ev) {
			for(var i=0; i<$scope.books.products.length;i++){
				if(id == $scope.books.products[i]._id){
					$scope.books.products.splice(i,1);
					break;
				}
			}	
			$http.delete('/api/v1/product/delete/'+id).success(function(data){
				dialogFactory.showToast("The book was deleted successfully");
				console.log(data);
			}).error(function(data) {
				console.log('Error: ' + data);
			});
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