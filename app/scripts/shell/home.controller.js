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
  }
}());
