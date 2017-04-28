/*
	Controller: DashboardController
	Author:- Ashish
	Created On :- 22 Sept 2015
	Description: This controller handles functionality related to dashboard.
*/
(function() {
	'use strict';

	angular
		.module('Dashboard')
		.controller('DashboardController', DashboardController);

	/* @ngInject */
	DashboardController.$inject = ['$scope', '$timeout', '$q', 'DashboardService', '$state'];

	//controller function definition
	function DashboardController($scope, $timeout, $q, $dashboardService, $state) {
		var vm = this;

		//method declaration for this controller
		vm.activate = activate;
		vm.renderStackChart = renderStackChart;
		vm.renderDonutChart = renderDonutChart;
		vm.refreshData = refreshData;

		//variable declaration for this controller
		vm.stackAreaData = [];
		vm.donutData = [];
		vm.tabs = ['Tab 1','Tab 2','Tab 3','Tab 4'];
		vm.selected = 0;

		//set columns for data grid
		var columnDefs = [
					{headerName: "Athlete", field: "athlete", width: 150, sort: 'desc', supressColumnToFit: false},
					{headerName: "Age", field: "age", supressColumnToFit: true},
					{headerName: "Country", field: "country", supressColumnToFit: true},
					{headerName: "Year", field: "year", unSortIcon: true, supressColumnToFit: true},
					{headerName: "Date", field: "date", comparator: dateComparator, supressColumnToFit: true},
					{headerName: "Sport", field: "sport", supressColumnToFit: true},
					{headerName: "Gold", field: "gold", supressColumnToFit: true},
					{headerName: "Silver", field: "silver", supressColumnToFit: true},
					{headerName: "Bronze", field: "bronze", supressColumnToFit: true},
					{headerName: "Total", field: "total", supressColumnToFit: true}
				];

		//set options for data grid
		$scope.gridOptions = {
			columnDefs: columnDefs,
			rowData: null,
			enableSorting: true,
			enableFilter: false,
			rowSelection: 'multiple',
			enableColResize: true
		};

		//calling initialization method
		activate();

		//method for activating page with data at the time of initialization
		function activate() {
			vm.stackAreaData = $dashboardService.getStackGraphData();
			vm.donutData =  $dashboardService.getDonutGraphData();
			
			//calling a parameterise function for generating stack area chart
			renderStackChart(vm.stackAreaData);
			
			//calling a parameterise function for generating donut chart
			renderDonutChart(vm.donutData, '#chart2','SMAATO');
			renderDonutChart(vm.donutData, '#chart3','UK');
			renderDonutChart(vm.donutData, '#chart4','Apple');
			renderDonutChart(vm.donutData, '#chart5','Image');
			
			//getting data for grid
			$dashboardService.getGridData().then(function(data){
				$scope.gridOptions.rowData = data;
				$scope.gridOptions.api.onNewRows();
				$scope.gridOptions.api.sizeColumnsToFit();
			});

			//resize grid on window resize
			jQuery(window).resize(function(){
				window.setTimeout(function(){
					$scope.gridOptions.api.sizeColumnsToFit();
				},300);
			});
		}

		//method for render stack chart
		function renderStackChart(stackAreaData) {
			var colors = d3.scale.category20();

			var chart;
			nv.addGraph(function() {
				chart = nv.models.stackedAreaChart()
					.useInteractiveGuideline(true)
					.x(function(d) { return d[0] })
					.y(function(d) { return d[1] })
					.controlLabels({stacked: "Stacked"})
					.duration(300);

				chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
				chart.yAxis.tickFormat(d3.format(',.4f'));
				chart.showLegend(false);

				d3.select('#chart1')
					.datum(stackAreaData)
					.transition().duration(1000)
					.call(chart)
					.each('start', function() {
						setTimeout(function() {
							d3.selectAll('#chart1 *').each(function() {
								if(this.__transition__)
									this.__transition__.duration = 1;
							})
						}, 0)
					});

				nv.utils.windowResize(chart.update);
				return chart;
			});
		}

		//method for render donut chart
		function renderDonutChart(donutData,chartID, title) {
			var chart = c3.generate({
				bindto: chartID,
				data: {
					columns: [
						['data1', 30, 200, 100, 400, 150, 250],
						['data2', 50, 20, 10, 40, 15, 25],
						['data3', 50, 20, 10, 30, 200, 100],
					],
					type : 'donut',
					onclick: function (d, i) { console.log("onclick", d, i); },
					onmouseover: function (d, i) { console.log("onmouseover", d, i); },
					onmouseout: function (d, i) { console.log("onmouseout", d, i); }
				},
				donut: {
					title: title
				}
			});
		}

		//method for grid date column compare
		function dateComparator(date1, date2) {
			var date1Number = monthToComparableNumber(date1);
			var date2Number = monthToComparableNumber(date2);

			if (date1Number===null && date2Number===null) {
				return 0;
			}
			if (date1Number===null) {
				return -1;
			}
			if (date2Number===null) {
				return 1;
			}

			return date1Number - date2Number;
		}

		// eg 29/08/2004 gets converted to 20040829
		function monthToComparableNumber(date) {
			if (date === undefined || date === null || date.length !== 10) {
				return null;
			}

			var yearNumber = date.substring(6,10);
			var monthNumber = date.substring(3,5);
			var dayNumber = date.substring(0,2);

			var result = (yearNumber*10000) + (monthNumber*100) + dayNumber;
			return result;
		}

		//method for refresh data
		function refreshData(key) {
			vm.selected = key;
			activate();
		}
	}
})();