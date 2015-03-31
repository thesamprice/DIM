(function () {
  'use strict';

  angular.module('dimApp')
    .factory('dimCookieService', CookieService);

  CookieService.$inject = ['$q', '$rootScope', '$cordovaInAppBrowser'];

  function CookieService($q, $rootScope, $cordovaInAppBrowser) {
    return {
      get: function() {
        if(!!window.chrome) { // chrome
          return viaChrome();
        }
        if(typeof InstallTrigger !== 'undefined') { // firefox
          return null;
        }
        if(document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1) {
          return viaPhoneGap(); // phonegap
        }
        return null;
      }
    };

    var _cookie = 0;

/********** chrome */

    var tokenPromise = null;

    function getBnetCookies() {
      return $q(function (resolve, reject) {
        chrome.cookies.getAll({
          'domain': '.bungie.net'
        }, getAllCallback);

        function getAllCallback(cookies) {
          if (_.size(cookies) > 0) {
            resolve(cookies);
          } else {
            reject('No cookies found.');
          }
        }
      });
    }

    function viaChrome() {
      tokenPromise = tokenPromise || getBnetCookies()
        .then(function (cookies) {
          return $q(function (resolve, reject) {
            var cookie = _.find(cookies, function (cookie) {
              return cookie.name === 'bungled';
            });

            if (!_.isUndefined(cookie)) {
              resolve(cookie.value);
            } else {
              if (_.isUndefined(location.search.split('reloaded')[1])) {
                chrome.tabs.create({
                  url: 'http://bungie.net',
                  active: false
                });

                setTimeout(function () {
                  window.location = window.location.origin + window.location.pathname + "?reloaded=true" + window.location.hash;
                }, 5000);
              }

              reject('No bungled cookie found.');
            }
          });
        })
        .catch(function (error) {
          tokenPromise = null;
        });

      return tokenPromise;
    }

/********** phonegap */

    function viaPhoneGap() {
      return $q(function (resolve, reject) { // phonegap
        if(_cookie !== undefined) {
          resolve(_cookie);
          return;
        }

        document.addEventListener('deviceready', function() {

        var options = {
          location: "yes"
        };

        // var type = 'Wlid';
        // $cordovaInAppBrowser.open('https://www.bungie.net/en/User/SignIn/' + type, '_blank', options).then(function () {
        //   console.log("InAppBrowser opened http://ngcordova.com successfully");
        // }, function (error) {
        //   console.log("Error: " + error);
        // });
        // $rootScope.$on("$cordovaInAppBrowser:loadstart", function (event) {
        //   if(event.url === 'https://www.bungie.net/') {
        //     $cordovaInAppBrowser.executeScript({code: 'document.cookie'}).then(function(result) {
        //       _cookie = /bungled=(\d*);/.exec(result)[1];
        //       resolve(_cookie);
        //       $cordovaInAppBrowser.close();
        //     });
        //   }
        // })

        var type = 'Wlid';
        var ref = window.open('https://www.bungie.net/en/User/SignIn/' + type, '_blank', 'location=yes');
        ref.addEventListener('loadstop', function(event) {
          if(event.url === 'https://www.bungie.net/') {
            ref.executeScript({code: 'document.cookie'}, function(result) {
              _cookie = /bungled=(\d*);/.exec(result)[1];
              resolve(_cookie);
              ref.close();
            });
          }
        });

      }, false);

      });
    }
  }
})();
