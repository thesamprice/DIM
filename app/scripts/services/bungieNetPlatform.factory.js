angular.module('app.services').factory('bungieNetPlatform', BungieNetPlatform);

BungieNetPlatform.$inject = ['$http'];

function BungieNetPlatform($http) {
  var _token;
  var _apiKey;

  var service = {
    initialize: initialize,
    user: {
      getBungieNetUser: GetBungieNetUser
    }
  };

  return service;

  function initialize(apiKey, token) {
    _token = token;
    _apiKey = apiKey;
  }

  function GetBungieNetUser() {
    var promise = $http({
        method: 'GET',
        url: 'https://www.bungie.net/Platform/User/GetBungieNetUser/',
        headers: {
          'X-API-Key': _apiKey,
          'x-csrf': _token,
          'content-type': 'application/json; charset=UTF-8;'
        },
        withCredentials: true
      });

    return promise;
  }
}
