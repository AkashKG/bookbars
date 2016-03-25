var app = angular.module('sampleApp', [ 'ngRoute', 'ngMaterial', 'ngAria',
		'ngMessages', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'AboutService',
		'RegisterCtrl', 'RegisterService', 'ProfileCtrl', 'ContactCtrl',
		'LogoutCtrl', 'SettingsCtrl', 'ShowbookCtrl', 'HelpCtrl', 'MyCartCtrl',
		'bookPrevCtrl' ]);

/*
 * app.service('user', function() { var s = {}; s.loadUser = function() {
 * $http.get('/api/v1/me').success(function(data) { s.user = data.user;
 * }).error(function(data, status) { if (status === status.UNAUTHORIZED) {
 * s.user = null; } }); }; s.loadUser(); setInterval(s.loadUser, 60 * 60 *
 * 1000); return s; });
 */
app.factory('dialogFactory', [
		'$mdDialog',
		'$mdToast',
		function($mdDialog, $mdToast) {
			return {
				showBookDialog : function() {
					$mdDialog.show({
						controller : 'ShowbookController',
						templateUrl : '/views/showbook/showbook.view.html',
						clickOutsideToClose : true,
					});
				},
				showToast : function(text) {
					var toast = $mdToast.simple().content(text).action('OK')
							.highlightAction(false).hideDelay(30000).position(
									"top");
					$mdToast.show(toast).then(function(response) {
						if (response == 'ok') {
							debugger;
						}
					});
				},
				showAlert : function(title, content) {
					$mdDialog.show($mdDialog.alert().clickOutsideToClose(true)
							.title(title).content(content).ariaLabel(
									'Alert Dialog Demo').ok('Got it!'));
				}
			}
		} ]);
app.factory('authFactory', [ '$q', '$timeout', '$http', '$rootScope',
		function($q, $timeout, $http, $rootScope) {
			return {
				logout : function() {
					var deferred = $q.defer();
					$rootScope.loading = true;
					$http.get('/auth/logout').success(function(data) {
						$rootScope.loading = false;
						user = false;
						deferred.resolve();
					}).error(function(data) {
						user = false;
						deferred.reject();
					})
					return deferred.promise;
				},
				register : function(email, password) {
					console.log(email + " " + password);
					var deferred = $q.defer();
					$http.post('/signup', {
						email : email,
						password : password
					}).success(function(data, status) {
						if (status === 200 && data.status) {
							deferred.resolve();
						} else {
							deferred.reject();
						}
					}).error(function(data) {
						deferred.reject();
					});
					return deferred.promise;
				}
			}
		} ]);

app.service('userService', [ '$q', '$http', '$rootScope', '$location',
		function($q, $http, $rootScope, $location) {
			return {
				getUser : function() {
					$rootScope.loading = true;
					return $http.get('api/v1/me').success(function(data) {
						$rootScope.loading = false;
						$rootScope.isLoggedIn = true;
						return data;
					}).error(function(data, status) {
						if (status = status.UNAUTHORIZED) {
							return null
						}
					});
				}

			};
		} ]);

app.service('bookService', [
		'$http',
		'$rootScope',
		'$location',
		function($http, $rootScope, $location) {
			return {
				getAllBooks : function() {
					return $http.get('/api/v1/product/allcategory').success(
							function(data) {
								return data;
							}).error(function(data, status) {
						if (status = status.UNAUTHORIZED) {
							return null
						}
					});
				},
				getBookById : function(id) {
					return $http.get('/api/v1/product/id/' + id).success(
							function(data) {
								return data;
							}).error(function(data, status) {
						if (status = status.UNAUTHORIZED) {
							return null
						}
					});
				},
				getBooksByQuery : function(query) {
					return $http.get('/api/v1/product/text/' + query).success(
							function(data) {
								return data;
							}).error(function(data, status) {
						if (status = status.UNAUTHORIZED) {
							return null
						}
					});
				},
				/*
				 * To be updated. I'm thinking to add this one on directly in
				 * users
				 */
				getBooksByUser : function() {
					return $http.get('/api/v1/product/allcategory/yesitsakash@hotmail.com')
					.success(
							function(data) {
								return data;
							}).error(function(data, status) {
						if (status = status.UNAUTHORIZED) {
							return null
						}
					});
				}
			}
		} ]);
/*
 * 
 * exports.$user = function($http) { var s = {};
 * 
 * s.loadUser = function() { $http. get('/api/v1/me'). success(function(data) {
 * s.user = data.user; }). error(function(data, status) { if (status ===
 * status.UNAUTHORIZED) { s.user = null; } }); };
 * 
 * s.loadUser();
 * 
 * setInterval(s.loadUser, 60 * 60 * 1000);
 * 
 * return s; };
 * 
 * 
 */

app.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});
