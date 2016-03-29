angular.module('appRoutes', []).config(
		[ '$routeProvider', '$locationProvider',
				function($routeProvider, $locationProvider) {
					$routeProvider
					// home page
					.when('/', {
						templateUrl : 'views/home.html',
						controller : 'MainController'
					})

					.when('/about', {
						templateUrl : 'views/about.html',
						controller : 'AboutController'
					}).when('/allbooks', {
						templateUrl : 'views/allbooks.html',
						controller : 'ShowbookController'
					}).when('/allbooks/:bookId', {
						templateUrl : 'views/showbook/particularbook.html',
						controller : 'bookPrevController'
					}).when('/help', {
						templateUrl : 'views/help.html',
						controller : 'HelpController'
					})

					.when('/register', {
						templateUrl : 'views/register.html',
						controller : 'RegisterController'
					}).when('/contact', {
						templateUrl : 'views/contactUs.html',
						controller : 'ContactController'
					}).when('/profile', {
						resolve : {
							"check" : function($location, $rootScope) {
								if (!$rootScope.isLoggedIn) {
									$location.path('/');
								}
							}
						},
						templateUrl : 'views/profile.html',
						controller : 'ProfileController'
					}).when('/addbook', {
						templateUrl : 'views/addBook.html',
						controller : 'ShowbookController'
					})
					.when('/requests', {
						templateUrl : 'views/bookrequests.html',
						controller : 'ShowbookController'
					}).when('/settings', {
						templateUrl : 'views/settings.html',
						controller : 'ProfileController'
					}).when('/showbook', {
						templateUrl : 'views/showbook.html',
						controller : 'ShowbookController'
					}).when('/mycart', {
						templateUrl : 'views/mycart.html',
						controller : 'MyCartController'
					}).when('/logout', {
						controller : 'LogoutController'
					}).otherwise({
						redirectTo : '/'
					});

					$locationProvider.html5Mode(true);

				} ]);