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
app.factory('dialogFactory',['$mdDialog','$mdToast',
                             function($mdDialog,$mdToast){
       						/*	var busyDialog; 
       							function loginController($scope, $mdDialog,customerService){
       									$scope.login = function() {
       									$scope.errorMsg=null;
       									$scope.closeBusyDialog = function() {
       										$mdToast.hide();
       		                    			  },
       									customerService.login($scope.loginData).then(function(data) {
       										$mdDialog.cancel();
       									}, function(error) {
       										switch(error.status){
       										case 401: $scope.errorMsg="Invalid username and password."
       											break;
       										case 503: $scope.errorMsg="Server not available."
       											break;
       										}
       									});
       								}
       							};
       							function resetPasswordController($scope, $mdDialog,customerService){
       								$scope.resetPassword= function(){
       									customerService.resetPassword($scope.resetData).then(function(data){
       										$scope.errorMsg="";
       										$mdDialog.cancel();
       									},function(err){
       										debugger;
       										$scope.errorMsg=err.data;
       									});
       								};
       							};*/
                           	  return{
                           		  /*showLoginDialog: function(){
                           			  $mdDialog.show({
                           				  controller: loginController,
                           			      templateUrl: 'views/login/login.dialog.html',
                           			      clickOutsideToClose:false,
                           			  });
                           		  },
                           		  showPasswordResetDialog:function(mandatory){
                           			  $mdDialog.show({
                           				  controller: resetPasswordController,
                           			      templateUrl: 'views/login/passwordreset.dialog.html',
                           			      clickOutsideToClose:!mandatory,
                           			  });
                           		  },
                           		  showToast: function(text){
                           			  var toast = $mdToast.simple()
                           	          .content(text)
                           	          .action('OK')
                           	          .highlightAction(false)
                           	          .hideDelay(30000)
                           	          .position("top");
                           	    $mdToast.show(toast).then(function(response) {
                           	      if ( response == 'ok' ) {
                           	        debugger;
                           	      }
                           	    });
                           		  },*/
                           		  showAlert: function(title,content){
                           			  $mdDialog.show(
                           				      $mdDialog.alert()
                           				        .clickOutsideToClose(true)
                           				        .title(title)
                           				        .content(content)
                           				        .ariaLabel('Alert Dialog Demo')
                           				        .ok('Got it!')
                           				    );
                           		  }
                           	  }
                             }]);