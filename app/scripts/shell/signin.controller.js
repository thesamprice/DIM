(function() {
  'use strict';

  angular.module('app.shell').controller('SigninCtrl', signinCtrl);

  signinCtrl.$inject = ['$scope', '$state', 'principal'];

  function signinCtrl($scope, $state, principal) {
    $scope.username = principal.identity.name;

    $scope.signin = function() {
      window.open('http://bungie.net','_blank');

      if ($scope.returnToState) {
        $state.go($scope.returnToState.name, $scope.returnToStateParams);
      } else {
        $state.go('home');
      }
    };
  }
}());
