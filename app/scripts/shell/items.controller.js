(function() {
  'use strict';

  angular.module('app.shell').controller('ItemsCtrl', ItemsController);

  ItemsController.$inject = ['$scope', '$state', 'principal', 'stores'];

  function ItemsController($scope, $state, principal, stores) {
    principal.identity()
      .then((identity) => {
        $scope.username = identity.name;
      });

    $scope.signout = function() {
      principal.authenticate(null);
      $state.go('signin');
    };
  }
}());
