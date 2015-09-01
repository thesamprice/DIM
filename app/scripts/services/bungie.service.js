(function() {
  'use strict';

  angular.module('app.services').factory('bungieService', bungieService);

  bungieService.$inject = ['$q'];

  function bungieService($q) {
    let apiKey = '57c5ff5864634503a0340ffdfbeb20c0';

    let service = {
      getToken: getBungleToken,
      getPlatforms: getPlatforms,
      getStores: getStores,
      transferItem: transferItem,
      equipItem: equipItem
    };

    return service;

    function getPlatforms() {
      return getBungleToken()
        .then((token) => {
          console.info(token);
        });
    }

    function getStores() {

    }

    function transferItem(item) {

    }

    function equipItem(item) {

    }

    function getBungleToken() {
      return getBnetCookies()
        .then((cookies) => {
            let cookie = _.find(cookies, function(cookie) {
              return cookie.name === 'bungled';
            });

            if (_.isUndefined(cookie)) {
              throw new Error(`No 'bungled' cookie found.`);
            }

            return cookie.value;

            // if (!_.isUndefined(cookie)) {
            //   resolve(cookie.value);
            // } else {
            //   chrome.tabs.query({
            //     'url': '*://*.bungie.net/*'
            //   }, function(tabs) {
            //     if (_.size(tabs) === 0) {
            //       chrome.tabs.create({
            //         url: 'http://bungie.net',
            //         active: false
            //       });
            //     }
            //   });
            //
            //   reject(new Error('No bungled cookie found.'));
            // }
        });
    }

    function getBnetCookies() {
      return $q((resolve, reject) => {
        chrome.cookies.getAll({
          domain: '.bungie.net'
        }, (cookies) => {
          if (_.size(cookies) > 0) {
            resolve(cookies);
          } else {
            reject(new Error('No cookies found.'));
          }
        });
      });
    }
  }
}());
