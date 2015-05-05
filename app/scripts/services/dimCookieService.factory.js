(function () {
  'use strict';

  angular.module('dimApp')
    .factory('dimCookieService', CookieService);

  CookieService.$inject = ['$q', '$rootScope'];

  function CookieService($q, $rootScope) {
    return {
      get: function() {
        if(!!window.chrome) { // chrome
          return viaChrome();
        }
        if(typeof InstallTrigger !== 'undefined') { // firefox
          return viaFirefox();
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

/********** firefox */

    function viaFirefox() {
      return $q(function (resolve, reject) { // firefox
        if(_cookie !== undefined) {
          resolve(_cookie);
          return;
        }

        _cookie = document.cookie;
        resolve(_cookie);
      });
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

        var type = 'Wlid';
        var visible = false;
        var ref = window.open('https://www.bungie.net/en/User/SignIn/' + type, '_blank', 'location=no,hidden=yes');
        ref.addEventListener('loadstart', function(event) {
          if(visible && event.url !== 'https://www.bungie.net/') {
            ref.insertCSS({code: "@keyframes spinner{to{transform:rotate(360deg)}}@-webkit-keyframes spinner{to{-webkit-transform:rotate(360deg)}}body{min-width:24px;min-height:24px;background:rgba(195,188,180,.9)}body:before{content:'Loading…';position:absolute;top:50%;left:50%;width:16px;height:16px;margin-top:-10px;margin-left:-10px}body:not(:required):before{content:'';border-radius:50%;border:2px solid rgba(0,0,0,.3);border-top-color:rgba(0,0,0,.6);animation:spinner .6s linear infinite;-webkit-animation:spinner .6s linear infinite}"});
            // ref.insertCSS({file: "styles/spinner.css"});
          }
        });

        var refStop = function(event) {
          if(event.url === 'https://www.bungie.net/') {
            ref.executeScript({code: 'document.cookie'}, function(result) {
              ref.removeEventListener('loadstop', refStop);
              ref.close();

              _cookie = /bungled=(\d*);/.exec(result)[1];
              resolve(_cookie);
            });
          } else {
            ref.show();
            visible = true;
          }
        }

        ref.addEventListener('loadstop', refStop);

      }, false);

      });
    }
  }
})();
