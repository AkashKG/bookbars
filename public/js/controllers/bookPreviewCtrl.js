var app = angular.module('bookPrevCtrl', []).controller('bookPrevController',
		function($rootScope, $scope, $http, $routeParams, dialogFactory, bookService) {
			$scope.avg=3.8;
			bookService.getBookById($routeParams.bookId).then(function(data,err){
				$rootScope.bookData = data.data;
			});
			$scope.rating={
					user:$rootScope.userData.user.profile.firstName,
					user_id:$rootScope.userData.user._id,
					comment:null,
					picture:$rootScope.userData.user.profile.picture,
					points:2
			}
			$scope.isOwners=function(uid){
				if(uid==$rootScope.userData.user._id)
					return false;
				return true;
			}
			$scope.postComment = function(){	
				console.log($scope.rating.user_id);
				$http.post('/api/v1/product/addcomment/' + $rootScope.bookData.product._id, $scope.rating).success(function(data){
					bookService.getBookById($routeParams.bookId).then(function(data,err){
						$scope.rating={};
						$rootScope.bookData = data.data;
					});
				}).error(function(data) {
					console.log('Error: ' + data);
				});
			}
			$scope.deleteComment = function(bookId, commentId){
				console.log(bookId + " " + commentId);
				$scope.delComment={
						b_id : bookId,
						c_id : commentId
				}
				console.log($scope.delComment);
				$http.delete('/api/v1/product/deletecomment/' + bookId + '/'+ commentId).success(function(data){
					dialogFactory.showToast("Your Comment was deleted!");
					bookService.getBookById($routeParams.bookId).then(function(data,err){
						$rootScope.bookData = data.data;
					});
					console.log(data + "Deleted");
				}).error(function(data) {
					console.log('Error: ' + data);
				});
				/*
				 * console.log(id); for(var i=0;i<$rootScope.bookData.product.rating.length;i++){
				 * if(id == $rootScope.bookData.product.rating[i]._id){
				 * console.log("Working!"); $scope.identify=id;
				 * console.log($scope.identify);
				 * $http.delete('/api/v1/product/deletecomment/' +
				 * $rootScope.bookData.product._id, $scope.identify
				 * ).success(function(data){
				 * 
				 * }).error(function(data) { console.log('Error: ' + data); });
				 * break; } }
				 */
			}
			
		});