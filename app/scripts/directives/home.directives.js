(function() {
  	'use strict';

	// angular.module('app.directives')
	// 	// Render options for vault/inventory column settings
	// 	.directive('renderColOptions', ColOptionsDirective);
	// 		function ColOptionsDirective() {
	// 		    return {
	// 				restrict: 'E',
	// 				template: function(elem, attr) {
	// 					return '<select class="btn btn-secondary" ng-change="'+attr.changefn+'" ng-model="'+attr.for+'.colWidth" ng-options="name for (name, value) in '+attr.for+'columns"></select>';
	// 				},
	// 				link: function(scope, elem, attr) {
	// 					switch(attr.for) {
	// 						case 'inventory':
	// 							scope.inventorycolumns = {
	// 								4 : 4,
	// 								5 : 5,
	// 								6 : 6
	// 							}
	// 						break;
	// 						case 'vault':
	// 							scope.vaultcolumns = {
	// 								4 : 4,
	// 								5 : 5,
	// 								6 : 6,
	// 								7 : 7,
	// 								8 : 8,
	// 								9 : 9
	// 							}
	// 						break;
	// 					}
	// 			    }
	// 			};
	// 		}

  angular.module('app.directives')
    .directive('renderColOptions', ColOptionsDirective);

  function ColOptionsDirective() {
    return {
      restrict: 'A',
      controller: ColOptionsController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function ColOptionsController() {
    let vm = this;

    vm.columns = {
    	"inventory": {
		    4: 4,
		    5: 5,
		    6: 6
		},
		"vault": {
			4: 4,
		    5: 5,
		    6: 6,
		    7: 7,
		    8: 8,
		    9: 9
		}
    };
  }

  // more directives for home page here
}());
