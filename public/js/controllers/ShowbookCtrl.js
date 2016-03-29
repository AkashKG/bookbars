angular.module('ShowbookCtrl', [])
	.controller('ShowbookController', 
			function($scope,$rootScope,$filter, $location, $window, $http, 
					$mdDialog, dialogFactory, userService, bookService) {
	
			
			
			/* Get All books */
			bookService.getAllBooks().then(function(data, err){
				$rootScope.books = data.data;
			});
			/*To check for requested book*/
			$scope.isBookRequested=function(id){
				for(var i=0;i<$scope.tradedBooks.length;i++){
					if($scope.tradedBooks[i]._id == id){
						return true;
					}
				}
				return false;	
			}
			/* Selection of book Type */
			$rootScope.userEmail=null;
			$scope.selectedType=null;
			$scope.bookowners=[{type:"My Books"},{type:"All Books"}];
			$scope.types = [{name:"Literature",categories:[{name:"Action & Adventure"},
	                		{name:"Literary Collections"},
	                		{name:"Fantacy"},
	                		{name:"Comics"}
	                		]
	                	},
	                	{name:"Non Fiction",categories:[{name:"Biograhies and Autobiographies"},
                		{name:"Business & Investing"},
                		{name:"Health & Fitness"},
                		{name:"History & Politics"},
                		{name:"Self Help"}
                		]
	                }, 
	                {name:"Academic",categories:[{name:"Entrance Exams"},{name:"School Books"},
                		{name:"Engineering"},
                		{name:"Medicine"},
                		{name:"Commerce"}
                		]
	                }, 
	                {name:"Children & Teens",categories:[{name:"Fantacy"},
                		{name:"Romance"},
                		{name:"Knowledge & Learning"},
                		{name:"Early Skill Building"},
                		{name:"Students"}]
	                }
	               ];
			
		/* Fucking Shit. It was not working earlier */
		userService.getUser().then(function(data,err){
			$rootScope.myBooks = data.data.user.profile.booksOwner;
			console.log($rootScope.myBooks);
			$scope.tradedBooks = data.data.user.profile.booksTradedByOwner;
			$scope.bookRequests=data.data.user.profile.bookRequests;
			$rootScope.userId = data.data.user._id;
			$rootScope.userName = data.data.user.profile.firstName;
			$rootScope.userEmail = data.data.user.profile.username;	
		});
	
		/*
		 * To get the subcategory of the category. Only works when category is
		 * selected
		 */
		$scope.getSubCat = function() {
			var filteredCategory = $filter('filter')($scope.types,$scope.selectedType);
			var value = filteredCategory[0].categories;
			return value;
		};
		
		$scope.items=[{id:null, name:null, detail:null, cover:null}];
		
		/* For Search */
		$scope.find=null;
		
		/* Searching function | Uses bookService */
		$scope.searchBook=function(query){
			$rootScope.loading=true;
			bookService.getBooksByQuery(query).then(function(data, err){
				$rootScope.loading=false;
				$rootScope.books=data.data;
				$scope.selectedType=$rootScope.books.products[0].category.ancestors[1];
				$scope.selectedParent=$rootScope.books.products[0].category.ancestors[0];
				$scope.selectedOwner='My Books';
			});
		}
		
		/*
		 * For the book preview. Using services is so much beneficial. It can be
		 * determined from here
		 */
		$scope.gotoBook=function(id, ev){
			bookService.getBookById(id).then(function(data, err){
				$scope.items = data.data.product;
				console.log($scope.items);
			})
			$scope.showBookDialog(ev); // To Show the dialog
		};
	
		/* Dialog Operation Starts */
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
		/* Dialog Operation ends */
	 
		$scope.myDate = new Date();
		$scope.addbookData={bookname:null,author:null,
				publisher:null,isbn:null,
				edition:null,date: $scope.myDate,
				status:null,picture:"http://assets.materialup.com/uploads/a9d0c27a-e40f-46da-87f3-6c2e1b39c01d/fsfs.png",
				category:$scope.selectedType,
				description: null,parent:null,
				ancestor:[],like:false,
				owner : $rootScope.userId
		}
		/* Dump Code */
		$scope.maxDate = new Date(
			      $scope.myDate.getFullYear(),
			      $scope.myDate.getMonth(),
			      $scope.myDate.getDate()
		);
		
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
		
		/* Addtion of book Starts */
		$rootScope.book=null;
		$scope.addBook=function(){
			$scope.addbookData.ancestor.push($scope.addbookData.parent);
			$scope.addbookData.ancestor.push($scope.selectedType);
			$rootScope.loading=true;
			$http.post('/api/v1/product/addbook', $scope.addbookData)
			.success(function(data) {
				$rootScope.loading=false;
				$scope.thisAct="The book " + $scope.addbookData.bookname + " was added successfully";
				dialogFactory.showToast($scope.thisAct);
				$location.path('/profile');
				$rootScope.book = data;
				
				 
				
				bookService.getAllBooks().then(function(data, err){
					$rootScope.books = data.data;
				});

				console.log($rootScope.book); console.log($rootScope.userId + " " +
						 $rootScope.book[$rootScope.book.length-1]._id + " " +
						 $scope.addbookData); console.log($scope.addbookData);
				$http.post('/api/v1/user/update/addbook/'+ $rootScope.userId + "/" + $scope.book[$scope.book.length-1]._id).success(function(data){
					dialogFactory.showToast("The book was also added to your account");
					$scope.addbookData = null; 
				}).error(function(data) {
					dialogFactory.showToast("ERROR : The book was not added to your id.");
					$scope.addbookData = {};
					console.log('Error: ' + data);
				});
			})
			.error(function(data) {
				dialogFactory.showToast("ERROR : The book was not added.");
				$scope.addbookData = {};
				console.log('Error: ' + data);
			});
			
		};
		
		/* Request for book [Temporary] */
		
		$scope.requestBook=function(bid, owner){
			$rootScope.loading=true;
					$scope.bid=bid;
					console.log( $rootScope.userId + " " +bid);
					$scope.bookOwner = owner;
					$http.post('/api/v1/user/update/requestBook/'+ $rootScope.userId + "/" + $scope.bid + "/" + $scope.bookOwner ).success(function(data){
					dialogFactory.showToast("The book was given for request.");
				}).error(function(data) {
				});
		};

		
		/* Delete book */
		$scope.deleteBook = function(id, ev) {
			var confirm = $mdDialog.confirm()
			.title("Delete Book")
			.targetEvent(ev)
			.content('Are You sure you want to delete the book?')
			.ariaLabel('Delete')
			.ok("Delete")
			.cancel('Cancel');
			$mdDialog.show(confirm).then(function(ev) {		
				$rootScope.loading=true;
				$http.delete('/api/v1/product/delete/'+id).success(function(data){
					$rootScope.loading=true;
					dialogFactory.showToast("The book was deleted successfully");
					bookService.getAllBooks().then(function(data, err){
						$rootScope.books = data.data;
					});
					$http.delete('/api/v1/user/update/deletebook/' +$rootScope.userId + '/' + id).success(function(data){
						userService.getUser().then(function(data,err){
							$rootScope.myBooks = data.data.user.profile.booksOwner;
							console.log($rootScope.myBooks);
						});
						dialogFactory.showToast("The book was also deleted from your repo");
						
					}).error(function(data){
						console.log('Error:' + data);
					});
				}).error(function(data) {
					console.log('Error: ' + data);
				});
			});
		}
	/* Normal search using Category and subcategory */
		
		$scope.search=function(){
			$rootScope.loading=true;
			$http.get('/api/v1/product/category/' + $scope.selectedParent).success(function(data) {
				$rootScope.loading=false;
				$rootScope.books = data;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		}
	/*
	 * Get all book by the owner. This function only displays the book uploaded
	 * by the owner. Has to be corrected. Will be modified later.
	 */
	/*
	 * userService.getMyBooks().then(function(data, err){ $rootScope.myBooks =
	 * data.data; });
	 */
		
	});