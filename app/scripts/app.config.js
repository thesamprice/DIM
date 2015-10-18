(function() {
  'use strict';

  angular.module('app')
    .config(config)
    .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];

  function config($stateProvider, $urlRouterProvider, $compileProvider) {
    let currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
    let newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0, -1) + '|chrome-extension:' + currentImgSrcSanitizationWhitelist.toString().slice(-1);

    $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);

    // route to root if no valid route found
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
        abstract: true,
        resolve: {
          authorize: ['authorization',
            function(authorization) {
              return authorization.authorize();
            }
          ]
        },
        templateUrl: 'views/site.html'
      })
      .state('home', {
        parent: 'root',
        url: '/',
        data: {
          roles: ['User']
        },
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('signin', {
        parent: 'root',
        url: '/signin',
        data: {
          roles: []
        },
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .state('restricted', {
        parent: 'root',
        url: '/restricted',
        data: {
          roles: ['Admin']
        },
        views: {
          'content@': {
            templateUrl: 'views/restricted.html'
          }
        }
      })
      .state('accessdenied', {
        parent: 'root',
        url: '/denied',
        data: {
          roles: []
        },
        views: {
          'content@': {
            templateUrl: 'views/denied.html'
          }
        }
      });
  }

  run.$inject = ['$rootScope', '$state', '$stateParams', 'authorization', 'principal', 'bungieService'];

  function run($rootScope, $state, $stateParams, authorization, principal, bungieService) {
    // let p = bungieService.getPlatforms()
    //   .catch((error) => {
    //     console.log(error);
    //   });

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      // track the state the user wants to go to; authorization service needs this
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
      // if the principal is resolved, do an authorization check immediately. otherwise,
      // it'll be done when the state it resolved.
      // if (principal.isIdentityResolved()) authorization.authorize();
    });
  }
}());
