angular.module('HelpCtrl', []).controller('HelpController', function($scope, $rootScope, $http, $location) {
	/*
	$http.get('api/v1/me').success(function(data) {
		$rootScope.userData = data;
	}).error(function(data) {
		console.log('Error: ' + data);
	});
	*/
	$scope.faq = [ {
		name : "How to use book barter?"

	}, {
		name : "How to sign in?"

	}, {
		name : "How to request new book?"

	}  ];
});