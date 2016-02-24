angular.module('MainCtrl', []).controller(
		'MainController',
		function($scope, $timeout, $mdSidenav, $log, $mdDialog, $location, $rootScope) {
		$scope.sidenavItems=[{
			href:'/profile',
			icon:'home',
			name:'Home'
		},
		{
			href:'/',
			icon:'input',
			name:'Login'
		},
		{
			href:'/help',
			icon:'help',
			name:'Help'
		},
		{
			href:'/',
			icon:'settings',
			name:'Settings'
		}];
		$scope.aboutIcons=[{
			icon:'search',
			name:'Search'
		},
		{
			icon:'shuffle',
			name:'Exchange'
		},
		{
			icon:'book',
			name:'Grow'
		}];
			    $scope.openMenu = function($mdOpenMenu, ev) {
			      $scope.originatorEv = ev;
			      $mdOpenMenu(ev);
			    };
			$scope.toggleLeft = buildDelayedToggler('left');
			$scope.toggleRight = buildToggler('right');
			$scope.isOpenRight = function() {
				return $mdSidenav('right').isOpen();
			};

			/**
			 * Supplies a function that will continue to operate until the time
			 * is up.
			 */
			function debounce(func, wait, context) {
				var timer;

				return function debounced() {
					var context = $scope, args = Array.prototype.slice
							.call(arguments);
					$timeout.cancel(timer);
					timer = $timeout(function() {
						timer = undefined;
						func.apply(context, args);
					}, wait || 10);
				};
			}

			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
			function buildDelayedToggler(navID) {
				return debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
			}

			function buildToggler(navID) {
				return function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}
			}
		$scope.loginData={
				username:null,
				password:null
		}
		
		$scope.regUsers=[{
			username:'atul',
			password:'avc'
		}]
		
		$scope.login=function(){
			
			for(var i=0;i<$scope.regUsers.length;i++){
				   if($scope.regUsers[i].username === $scope.loginData.username){
					   if($scope.regUsers[i].password === $scope.loginData.password)
						   {$location.path('/profile');
						     rootScope.isLoggedIn='true';
						     }
						  }
				   }
			}
			
		

		$rootScope.logout = function() {
			$location.path('/');
			$rootScope.isLoggedIn = '';
		};	
			
			
		}).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function() {
		$mdSidenav('left').close().then(function() {
			$log.debug("close LEFT is done");
		});

	};
	
	
	
}).controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function() {
		$mdSidenav('right').close().then(function() {
			$log.debug("close RIGHT is done");
		});
	};
});


