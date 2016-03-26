angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/allbooks', {
			templateUrl: 'views/allBook.html',
			controller: 'ShowbookController'
		})
		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'AboutController'
		})
		.when('/help', {
			templateUrl: 'views/help.html',
			controller: 'HelpController'
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
			resolve : {
				if(!$rootScope.isLoggedIn){
					$location.path('/');
				}
			},
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'
		})
		.when('/addbook',{
			templateUrl: 'views/addBook.html',
			controller: 'ShowbookController'
		})
		.when('/settings',{
			templateUrl: 'views/settings.html',
			controller: 'ProfileController'
		})
		.when('/showbook',{
			templateUrl: 'views/showbook.html',
			controller: 'ShowbookController'
		});

	$locationProvider.html5Mode(true);

}]);