/*
	Config: inAppdRouteProvider
	Author:- Ashish
	Created On :- 22 Sept 2015
	Description: This config handles functionality related to routing the application.
*/
(function() {
	'use strict';

	angular
		.module('inAppd')
		.config(inAppdRouteProvider);

		/* @ngInject */
		inAppdRouteProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

		//method for defining routes
		function inAppdRouteProvider($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/inappd/dashboard');
			$stateProvider
			.state('inappd', {
				url: '/inappd',
				abstract: true,
				templateUrl: '/angular-demo/app/layout/layout.html'
			})
			.state('inappd.dashboard', {
				url: '/dashboard',
				views:{
					'content': {
						templateUrl: "/angular-demo/dashboard/views/dashboard.html",
						controller: "DashboardController",
						controllerAs: 'dashboard'
					}
				}
			});
		}
})();