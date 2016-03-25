var app = angular.module('bookPrevCtrl', []).controller('bookPrevController',
		function($rootScope, $scope, $http, $routeParams, dialogFactory) {
			$scope.avg=3.8;
			$http.get('/api/v1/product/id/' + $routeParams.bookId).success(function(data) {
				$rootScope.bookData = data;
				console.log(data);
			}).error(function(data) {
				console.log('Error: ' + data);
			});
			$scope.rating={
					comment:null,
					points:2
			}
			$scope.postComment = function(){
				$http.post('/api/v1/product/addcomment/' + $rootScope.bookData.product._id, $scope.rating).success(function(data){

					$rootScope.bookData.product.rating.push($scope.rating);
					dialogFactory.showToast("Your Comment was added successfully");
					$rootScope.bookData=data;
					console.log(data);
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
					dialogFactory.showToast("Your Comment was deleted! Please reload if it still shows.");
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