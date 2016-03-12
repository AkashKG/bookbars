var app = angular.module('sampleApp', [ 'ngRoute', 'ngMaterial', 'ngAria',
		'ngMessages', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'AboutService',
		'RegisterCtrl', 'RegisterService', 'ProfileCtrl', 'ContactCtrl',
		'AddbookCtrl', 'SettingsCtrl', 'ShowbookCtrl' ]);

/*app.service('user', function() {
	var s = {};
	s.loadUser = function() {
		$http.get('/api/v1/me').success(function(data) {
			s.user = data.user;
		}).error(function(data, status) {
			if (status === status.UNAUTHORIZED) {
				s.user = null;
			}
		});
	};
	s.loadUser();
	setInterval(s.loadUser, 60 * 60 * 1000);
	return s;
});
*/