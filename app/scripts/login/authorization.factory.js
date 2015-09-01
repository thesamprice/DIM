(function() {
  'use strict';

  angular.module('app.login').factory('authorization', authorization);

  authorization.$inject = ['$rootScope', '$state', 'principal'];

  function authorization($rootScope, $state, principal) {
    let service = {
      authorize: authorize
    };

    return service;

    function authorize() {
      return principal.identity()
        .then(() => {
          let isAuthenticated = principal.isAuthenticated();
          let data = $rootScope.toState.data;

          if (_.has(data, 'roles') && (_.size(data.roles) > 0) && !principal.isInAnyRole(data.roles)) {
            if (isAuthenticated) {
              $state.go('accessdenied'); // user is signed in but not authorized for desired state
            } else {
              // user is not authenticated. stow the state they wanted before you
              // send them to the signin state, so you can return them when you're done
              $rootScope.returnToState = $rootScope.toState;
              $rootScope.returnToStateParams = $rootScope.toStateParams;

              // now, send them to the signin state so they can log in
              $state.go('signin');
            }
          }
        });
    }
  }
}());
