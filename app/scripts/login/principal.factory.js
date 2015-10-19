(function() {
  'use strict';

  angular.module('app.login').factory('principal', principal);

  principal.$inject = ['$q', 'bungieService'];

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
          let self = this;

          bungieService.getUser()
            .then(bungieService.getUser)
            .then((response) => {
              if (response.status === 200) {
                var platform = response.data;

                if (platform.ErrorCode === 1) {
                  self.authenticate({
                    user: platform.Response.user,
                    roles: ['User']
                  });

                  resolve(_identity);
                } else {
                  self.authenticate(null);
                  resolve(_identity);
                }
              } else {
                self.authenticate(null);
                resolve(_identity);
              }
            })
            .catch((err) => {
              self.authenticate(null);
              resolve(_identity);
            });
        }
      });
    }
  }
}());
