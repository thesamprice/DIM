(function() {
  'use strict';

  angular.module('app.services').factory('bungieService', bungieService);

  bungieService.$inject = ['$q', 'bungieNetPlatform'];

  function bungieService($q, bungieNetPlatform) {
    let _apiKey = '57c5ff5864634503a0340ffdfbeb20c0';
    let _getBungleTokenPromise;
    let _getBungieNetuserPromise;
    let _getDestinyStoresPromise;

    let service = {
      getToken: getBungleToken,
      getUser: getUser,
      getStore: getStore,
      getStores: getStores,
      transferItem: transferItem,
      equipItem: equipItem
    };

    return service;

    function reset() {
      _getBungleTokenPromise = null;
      _getBungieNetuserPromise = null;
    }

    function getUser() {
      if (!_getBungieNetuserPromise) {
        _getBungieNetuserPromise = getBungleToken()
          .then((token) => {
            return bungieNetPlatform.getBungieNetUser(_apiKey, token);
          });
      }

      return _getBungieNetuserPromise;
    }

    function getStore() {
      return $q.when(null);
    }

    function getStores(getLatest) {
      if (!_getDestinyStoresPromise) {
        _getDestinyStoresPromise = getBungleToken()
          .then(function(token) {

          });
      }

      return $q.when(null);
    }

    function transferItem(item) {
      return $q.when(null);
    }

    function equipItem(item) {
      return $q.when(null);
    }

    function getBungleToken() {
      if (!_getBungleTokenPromise) {
        _getBungleTokenPromise = getBnetCookies()
          .then((cookies) => {
            let cookie = _.find(cookies, function(cookie) {
              return cookie.name === 'bungled';
            });

            if (_.isUndefined(cookie)) {
              reset();
              throw new Error(`No 'bungled' cookie found.`);
            }

            return cookie.value;
          });
      }

      return _getBungleTokenPromise;
    }

    function getBnetCookies() {
      return $q((resolve, reject) => {
        chrome.cookies.getAll({
          domain: '.bungie.net'
        }, (cookies) => {
          if (_.size(cookies) > 0) {
            resolve(cookies);
          } else {
            reset();
            reject(new Error('No cookies found.'));
          }
        });
      });
    }
  }
}());
