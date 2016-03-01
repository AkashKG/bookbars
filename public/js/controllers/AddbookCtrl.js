angular.module('AddbookCtrl', []).controller('AddbookController', function($scope) {
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
	
$scope.Addbook=function(){
		
		
	
};

});