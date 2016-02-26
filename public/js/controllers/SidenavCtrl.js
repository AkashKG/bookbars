angular.module('SidenavCtrl', []).directive('sideNav', function() {
	return {
		controller : 'SidenavController',
		templateUrl : './template/sidenav.html'
	}
}).controller('SidenavController', function($scope, $timeout, $mdSidenav, $log) {
	$scope.sidenavItems = [ {
		href : '/profile',
		icon : 'home',
		name : 'Home'
	}, {
		href : '/',
		icon : 'input',
		name : 'Login'
	}, {
		href : '/help',
		icon : 'help',
		name : 'Help'
	}, {
		href : '/',
		icon : 'settings',
		name : 'Settings'
	} ];

	$scope.close = function() {
		$mdSidenav('left').close().then(function() {
			$log.debug("close LEFT is done");
		});

	};
});
