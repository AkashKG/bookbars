angular
		.module('MainCtrl', [])
		.controller(
				'MainController',
				function($scope, $timeout, $mdSidenav, $log, $mdDialog,
						$location, $rootScope) {
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
					$scope.aboutIcons = [ {
						icon : 'search',
						name : 'Search'
					}, {
						icon : 'shuffle',
						name : 'Exchange'
					}, {
						icon : 'book',
						name : 'Grow'
					} ];
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
					 * Supplies a function that will continue to operate until
					 * the time is up.
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
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
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
					$scope.loginData = {
						username : null,
						password : null
					}

					$scope.regUsers = [ {
						username : 'atul',
						password : 'avc'
					} ]

					$scope.err = null;

					$scope.login = function() {

						for (var i = 0; i < $scope.regUsers.length; i++) {
							if ($scope.regUsers[i].username === $scope.loginData.username) {
								if ($scope.regUsers[i].password === $scope.loginData.password) {
									$location.path('/profile');
									$scope.err = null;
									rootScope.isLoggedIn = 'true';
								}
							} else {
								$scope.err = "Invalid Username/Password..."
							}
						}

						for (var i = 0; i < $scope.regUsers.length; i++) {
							if ($scope.regUsers[i].username === $scope.loginData.username) {
								if ($scope.regUsers[i].password === $scope.loginData.password) {
									$location.path('/profile');
									rootScope.isLoggedIn = 'true';
								}
							}
						}
					}

					$rootScope.logout = function() {
						$location.path('/');
						$rootScope.isLoggedIn = '';
					};

					var self = this;

					self.simulateQuery = false;
					self.isDisabled = false;

					self.repos = loadAll();
					self.querySearch = querySearch;
					self.selectedItemChange = selectedItemChange;
					self.searchTextChange = searchTextChange;

					// ******************************
					// Internal methods
					// ******************************

					/**
					 * Search for repos... use $timeout to simulate remote
					 * dataservice call.
					 */
					function querySearch(query) {
						var results = query ? self.repos
								.filter(createFilterFor(query)) : self.repos, deferred;
						if (self.simulateQuery) {
							deferred = $q.defer();
							$timeout(function() {
								deferred.resolve(results);
							}, Math.random() * 1000, false);
							return deferred.promise;
						} else {
							return results;
						}
					}

					function searchTextChange(text) {
						$log.info('Text changed to ' + text);
					}

					function selectedItemChange(item) {
						$log.info('Item changed to ' + JSON.stringify(item));
						$location.path(item.url);
					}

					/**
					 * Build `components` list of key/value pairs
					 */
					function loadAll() {
						var repos = [ {
							'name' : 'Introduction to Algorithms',
							'url' : '/akashkg/intro_to_algorithms',
							'stars' : '4.3',
							'booked' : '21',
						}, {
							'name' : 'Half Girlfriend',
							'url' : '/akashkg/half_girlfriend',
							'stars' : '2.1',
							'booked' : '1',
						}, {
							'name' : 'The Notebook',
							'url' : '/akashkg/the_notebook',
							'stars' : '3.4',
							'booked' : '79',
						}, {
							'name' : 'Introduction to Algorithms',
							'url' : '/akashkg/intro_to_algorithms2',
							'stars' : '4.3',
							'booked' : '21',
						}, {
							'name' : 'Half Girlfriend',
							'url' : '/akashkg/half_girlfriend2',
							'stars' : '2.1',
							'booked' : '1',
						}, {
							'name' : 'The Notebook',
							'url' : '/akashkg/the_notebook2',
							'stars' : '3.4',
							'booked' : '79',
						} ];
						return repos.map(function(repo) {
							repo.value = repo.name.toLowerCase();
							return repo;
						});
					}

					/**
					 * Create filter function for a query string
					 */
					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);

						return function filterFn(item) {
							return (item.value.indexOf(lowercaseQuery) === 0);
						};

					}

				}).controller('LeftCtrl',
				function($scope, $timeout, $mdSidenav, $log) {
					$scope.close = function() {
						$mdSidenav('left').close().then(function() {
							$log.debug("close LEFT is done");
						});

					};

				}).controller('RightCtrl',
				function($scope, $timeout, $mdSidenav, $log) {
					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};
				});
