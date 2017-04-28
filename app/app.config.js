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

			$urlRouterProvider.otherwise('/angular-demo/dashboard');
			$stateProvider
			.state('angular-demo', {
				url: '/angular-demo',
				abstract: true,
				templateUrl: '/app/layout/layout.html'
			})
			.state('angular-demo.dashboard', {
				url: '/dashboard',
				views:{
					'content': {
						templateUrl: "/dashboard/views/dashboard.html",
						controller: "DashboardController",
						controllerAs: 'dashboard'
					}
				}
			});
		}
})();