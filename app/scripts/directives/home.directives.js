(function() {
  	'use strict';
  	alert("here");
	angular.module('app.directives')
		.directive('renderColOptions', ColOptionsDirective);
	  	ColOptionsDirective.$inject = ['$scope'];
		function ColOptionsDirective($scope) {
		    return {
				restrict: 'A',
				controller: function($scope) {
					$scope.columns = {
						4 : 4,
						5 : 5,
						6 : 6,
						7 : 7,
						8 : 8,
						9 : 9
					}

					$scope.select = function() {
				    	$scope.selected = 4;
				    };
			    }
			};
		}

		// more directives for home page here
}());