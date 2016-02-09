angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/home', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/login', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);