angular
		.module('NavbarCtrl', [])
		.directive('navBar', function() {
			return {
				controller : 'NavbarController',
				templateUrl : './template/navbar.html'
			}
		})
		.controller(
				'NavbarController',
				function($scope, $log, $timeout, $location, $q, $mdSidenav,
						$rootScope) {
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

					var self = $scope;
					self.simulateQuery = false;
					self.isDisabled = false;
					self.repos = loadAll();
					self.querySearch = querySearch;
					self.selectedItemChange = selectedItemChange;
					self.searchTextChange = searchTextChange;
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
				});
