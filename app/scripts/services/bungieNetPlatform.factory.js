angular.module('app.services').factory('bungieNetPlatform', BungieNetPlatform);

BungieNetPlatform.$inject = ['$http'];

function BungieNetPlatform($http) {
  var service = {
    getBungieNetUser: getBungieNetUser,
    getMembershipID: getMembershipID
  };

  return service;

  function getBungieNetUser(apiKey, token) {
    var promise = $http({
        method: 'GET',
        url: 'https://www.bungie.net/Platform/User/GetBungieNetUser/',
        headers: {
          'X-API-Key': apiKey,
          'x-csrf': token,
          'content-type': 'application/json; charset=UTF-8;'
        },
        withCredentials: true
      });

    return promise;
  }

  function getMembershipID(apiKey, token, platformID, platformPlayerHandle) {
    var promise = $http({
          method: 'GET',
          url: 'https://www.bungie.net/Platform/Destiny/' + platformID + '/Stats/GetMembershipIdByDisplayName/' + platformPlayerHandle + '/',
          headers: {
            'X-API-Key': apiKey,
            'x-csrf': token,
            'content-type': 'application/json; charset=UTF-8;'
          },
          withCredentials: true
        });
  }
}
