/*
	Module: inAppd
	Author:- Ashish
	Created On :- 22 Sept 2015
	Description: define the application module and injecting common dependency and sub modules.
*/
(function() {
	'use strict';

	angular
		.module('inAppd', ['ui.router', 'Dashboard']);
})();