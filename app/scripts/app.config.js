(function() {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];

  function config($stateProvider, $urlRouterProvider, $compileProvider) {
    let currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
    let newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0, -1) + '|chrome-extension:' + currentImgSrcSanitizationWhitelist.toString().slice(-1);

    $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);

    // route to root if no valid route found
    $urlRouterProvider.otherwise('/items');

    $stateProvider.state('site', {
      abstract: true,
      resolve: {
        authorize: ['authorization',
          function(authorization) {
            return authorization.authorize();
          }
        ],
        stores: ['storeService', 'principal', '$q', function getStores(storeService, principal, $q) {
          if (principal.isAuthenticated()) {
            return storeService.getStores(true)
              .catch(function(error) {
                console.log(error);
              });
          } else {
            return $q.when(null);
          }
        }]
      },
      templateUrl: 'views/site.html',
      controller: 'SiteCtrl as vm'
    })

    .state('items', {
      parent: 'site',
      url: '/items',
      data: {
        roles: ['User']
      },
      resolve: {
        authorize: ['authorization',
          function(authorization) {
            return authorization.authorize();
          }
        ],
        stores: ['storeService', function getStores(storeService) {
          return storeService.getStores()
            .catch(function(error) {
              console.log(error);
            });
        }]
      },
      templateUrl: 'views/items.html',
      controller: 'ItemsCtrl'
    })

    .state('signin', {
      parent: 'site',
      url: '/signin',
      data: {
        roles: []
      },
      templateUrl: 'views/signin.html',
      controller: 'SigninCtrl'
    })

    .state('restricted', {
      parent: 'site',
      url: '/restricted',
      data: {
        roles: ['Admin']
      },
      templateUrl: 'views/restricted.html'
    })

    .state('accessdenied', {
      parent: 'site',
      url: '/denied',
      data: {
        roles: []
      },
      templateUrl: 'views/denied.html'
    });
  }
}());
