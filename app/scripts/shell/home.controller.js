(function() {
  'use strict';

  angular.module('app.shell').controller('HomeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', '$state', 'principal'];

  function homeCtrl($scope, $state, principal) {
    principal.identity()
      .then((identity) => {
        $scope.username = identity.name;
      });

    $scope.signout = function() {
      principal.authenticate(null);
      $state.go('signin');
    };

    $scope.inventoryChangeCol = function() {
      var me = $scope;
      console.log("Inventory Col = " + me.inventory.colWidth)
    }

    $scope.vaultChangeCol = function() {
      var me = $scope;
      console.log("Vault Col = " + me.vault.colWidth)
    }
  }
}());
