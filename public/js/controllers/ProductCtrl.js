angular.module('ProductCtrl', []).controller('ProductController', function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams.id);
	http.get('/api/v1/product/id' + encoded).success(function(data){
		$scope.product = data.product;
	});
	setTimeout(function(){
		$scope.emit('ProductController');
	},0);
});