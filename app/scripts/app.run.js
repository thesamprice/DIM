(function() {
  'use strict';

  angular.module('app').run(run);

  run.$inject = ['$rootScope', '$state', '$stateParams', 'settingsService', 'authorization', 'principal'];

  function run($rootScope, $state, $stateParams, settings, authorization, principal) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
      // if the principal is resolved, do an authorization check immediately. otherwise,
      // it'll be done when the state it resolved.
      if (principal.isIdentityResolved()) authorization.authorize();
    });

    settings.initialize();
  }
}());
