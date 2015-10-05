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

    $scope.vaultChangeCol = function(colStyle) {
      $scope.vaultCustomColumns = colStyle;
    }

    $scope.invChangeCol = function(colStyle){
      $scope.inventoryCustomColumns = colStyle;
    }

    // initialize column settings defaults
    $scope.inventoryCustomColumns = "inv-col-4";
    $scope.vaultCustomColumns = "vault-col-5";
    console.log($state.invColumns)
  }
}());
