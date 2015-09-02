(function() {
  'use strict';

  angular.module('app.login').factory('principal', principal);

  principal.$inject = ['$q','bungieService'];

  function principal($q, bungieService) {
    let _identity = undefined;
    let _authenticated = false;

    let service = {
      isIdentityResolved: isIdentityResolved,
      isAuthenticated: isAuthenticated,
      isInRole: isInRole,
      isInAnyRole: isInAnyRole,
      authenticate: authenticate,
      identity: identity
    };

    return service;

    function isIdentityResolved() {
      return !_.isUndefined(_identity);
    }

    function isAuthenticated() {
      return _authenticated;
    }

    function isInRole(role) {
      if (!_authenticated || !_identity.roles) {
        return false;
      }

      return _identity.roles.indexOf(role) != -1;
    }

    function isInAnyRole(roles) {
      if (!_authenticated || !_identity.roles) {
        return false;
      }

      if (_.some(roles, this.isInRole)) {
        return true;
      }

      return false;
    }

    function authenticate(identity) {
      _identity = identity;
      _authenticated = identity != null;
    }

    function identity(force) {
      return $q((resolve, reject) => {
        if (force === true) {
          _identity = undefined;
        }

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (!_.isUndefined(_identity)) {
          resolve(_identity);
        } else {
          // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
          //                   $http.get('/svc/account/identity', { ignoreErrors: true })
          //                        .success(function(data) {
          //                            _identity = data;
          //                            _authenticated = true;
          //                            deferred.resolve(_identity);
          //                        })
          //                        .error(function () {
          //                            _identity = null;
          //                            _authenticated = false;
          //                            deferred.resolve(_identity);
          //                        });

          // for the sake of the demo, fake the lookup by using a timeout to create a valid
          // fake identity. in reality,  you'll want something more like the $http request
          // commented out above. in this example, we fake looking up to find the user is
          // not logged in
          let self = this;

          bungieService.getToken()
            .then((token) => {
              self.authenticate({
                name: 'apple ' + token,
                roles: ['User']
              });
              resolve(_identity);
            })
            .catch((err) => {
              self.authenticate(null);
              resolve(_identity);
            });

          // $timeout(() => {
          //   self.authenticate(null);
          //   resolve(_identity);
          // }, 1000);
        }
      });
    }
  }
}());
