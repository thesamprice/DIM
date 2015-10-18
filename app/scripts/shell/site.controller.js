(function() {
  'use strict';

  angular.module('app.shell').controller('SiteCtrl', SiteController);

  SiteController.$inject = ['$scope', '$state', 'principal'];

  function SiteController($scope, $state, principal) {
    let vm = this;

    vm.menuOpen = false;

    vm.toggleMenu = () => {
      vm.menuOpen = !vm.menuOpen;
    }

    $scope.$watch('vm.menuOpen', (newValue, oldValue) => {
      $('body').toggleClass('no-overflow', newValue);
    });
  }
}());
