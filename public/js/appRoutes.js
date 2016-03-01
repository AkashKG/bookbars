angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'AboutController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegisterController'	
		})
		.when('/contact', {
			templateUrl: 'views/contactUs.html',
			controller: 'ContactController'	
		})
		.when('/profile',{
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'
		})
		.when('/addbook',{
			templateUrl: 'views/addBook.html',
			controller: 'AddbookController'
		})
		.when('/settings',{
			templateUrl: 'views/settings.html',
			controller: 'ProfileController'
		});

	$locationProvider.html5Mode(true);

}]);