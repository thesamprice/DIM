(function() {
  'use strict';

  angular.module('app.shell').controller('HomeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', '$state', 'principal'];

  function homeCtrl($scope, $state, principal) {
    $scope.signout = function() {
      principal.authenticate(null);
      $state.go('signin');
    };
  }
}());
