var app = angular.module('sampleApp', [ 'ngRoute', 'ngMaterial', 'ngAria',
		'ngMessages', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'AboutService',
		'RegisterCtrl', 'RegisterService', 'ProfileCtrl', 'ContactCtrl',
		'AddbookCtrl', 'SettingsCtrl', 'ShowbookCtrl', 'MyCartCtrl',
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

app.service('userService', [ '$q', '$http', '$rootScope', '$location',
		function($q, $http, $rootScope, $location) {
			return {
				getUser : function() {
					return $http.get('api/v1/me').success(function(data,err){
						console.log(data);
						return data;
					});
				}
			};
		} ]);