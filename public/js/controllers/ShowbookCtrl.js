angular.module('ShowbookCtrl', []).controller('ShowbookController', function($scope,$rootScope,$filter, $location, $window, $http, $mdDialog, dialogFactory, userService) {
	/*
	 * $http.get('api/v1/me').success(function(data) { $rootScope.userEmail =
	 * data; console.log(data); }).error(function(data) { console.log('Error: ' +
	 * data); });
	 */
	$rootScope.userEmail=null;
	
	$scope.bookowners=[{type:"My Books"},{type:"All Books"}];
	$scope.types = [
	                { 
	                	name:"Literature",
	                	categories:[{
	                			name:"Action & Adventure"
	                		},
	                		{
	                			name:"Literary Collections"
	                		},
	                		{
	                			name:"Fantacy"
	                		},
	                		{
	                			name:"Comics"
	                		}]
	                },
	                {
	                	name:"Non Fiction",
	                	categories:[{
                			name:"Biograhies and Autobiographies"
                		},
                		{
                			name:"Business & Investing"
                		},
                		{
                			name:"Health & Fitness"
                		},
                		{
                			name:"History & Politics"
                		},
                		{
                			name:"Self Help"
                		}]
	                }, 
	                {
	                	name:"Academic",
	                	categories:[{
                			name:"Entrance Exams"
                		},
                		{
                			name:"School Books"
                		},
                		{
                			name:"Engineering"
                		},
                		{
                			name:"Medicine"
                		},
                		{
                			name:"Commerce"
                		}
                		]
	                }, 
	                {
	                	name:"Children & Teens",
	                	categories:[{
                			name:"Fantacy"
                		},
                		{
                			name:"Romance"
                		},
                		{
                			name:"Knowledge & Learning"
                		},
                		{
                			name:"Early Skill Building"
                		},
                		{
                			name:"Students"
                		}]
	                }
	               ];
		userService.getUser().then(function(data,err){
			$rootScope.userId = data.data.user._id;
			$rootScope.userName = data.data.user.profile.firstName;
			$rootScope.userEmail = data.data.user.profile.username;	
			console.log(data.data.user.profile.username);
		});
		$scope.selectedType=null;
	
		$scope.getSubCat = function() {// Not working
			var filteredCategory = $filter('filter')(
					$scope.types,
					$scope.selectedType);
			var value = filteredCategory[0].categories;
			return value;
		};
	$scope.items=[{
		id:null,
		name:null,
		detail:null,
		cover:null
	}];
	$scope.find=null;
	$scope.searchBook=function(query){
		$http.get('/api/v1/product/text/' + query).success(function(data){
			$rootScope.books=data;
			console.log(data.products[0].category);
			// console.log(data.products.category.ancestors);
			$scope.selectedType=$rootScope.books.products[0].category.ancestors[1];
			$scope.selectedParent=$rootScope.books.products[0].category.ancestors[0];
			$scope.selectedOwner='My Books';
		}).error(function(err){
			console.log(err);
		});
	}
	
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
				category:$scope.selectedType,
				description: null,
				parent:null,
				ancestor:[],
				like:false,
				owner : 'yesitsakash@hotmail.com',
		// activity: null
		}
	
		$scope.maxDate = new Date(
			      $scope.myDate.getFullYear(),
			      $scope.myDate.getMonth(),
			      $scope.myDate.getDate()
			      );
	/*
	 * $scope.addActivity=function(data){ $scope.activity = data;
	 * console.log($rootScope.userId); $http.post('/api/v1/user/activity/'+
	 * $rootScope.userId, $scope.activity).success(function(data){
	 * $scope.allActivity=data; }).error(function(err){ console.log(err); }) };
	 */
		$scope.likeBook = function(id){
			console.log("GOT HERE");
			$http.get('/api/v1/product/id/' + id).success(function(data){
				$scope.thisBookLike=data;
				console.log($scope.thisBookLike);
			
				$scope.rating=true;
			$http.put('/api/v1/update/like/'+id, $scope.rating).success(function(data){
				$scope.myBooks=data;
			})
			}).error(function(err){
				console.log(err);
			});
		}
	$scope.addBook=function(){
		$scope.addbookData.ancestor.push($scope.addbookData.parent);
		$scope.addbookData.ancestor.push($scope.selectedType);
		console.log($scope.addbookData.ancestor);
	// $scope.addbookData.activity=$rootScope.userName + " was trying to add the
	// book " + $scope.addbookData.bookname + " by " $scope.addbookData.author;
		$http.post('/api/v1/product/addbook', $scope.addbookData)
        .success(function(data) {
        	$scope.thisAct="The book " + $scope.addbookData.bookname + " was added successfully";
            dialogFactory.showToast($scope.thisAct);
         // $scope.addActivity($scope.thisAct);
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
			for(var i=0; i<$scope.myBooks.products.length;i++){
				if(id == $scope.myBooks.products[i]._id){
					$scope.myBooks.products.splice(i,1);
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
	
	$scope.search=function(){
		$http.get('/api/v1/product/category/' + $scope.selectedParent).success(function(data) {
			$rootScope.books = data;
			// console.log(data);
		// console.log(data.products.name);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
		$http.get('/api/v1/product/allcategory').success(function(data) {
			$rootScope.books = data;
			console.log(data);
		// console.log(data.products.name);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		var URL='/api/v1/product/allcategory/yesitsakash@hotmail.com';
		$http.get(URL).success(function(data) {
			console.log($rootScope.userEmail);
			$rootScope.myBooks = data;
			console.log(data);
		// console.log(data.products.name);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		
	});