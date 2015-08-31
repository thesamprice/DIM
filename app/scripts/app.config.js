(function() {
  'use strict';

  angular.module('app')
    .config(config)
    .run(run);

    config.$inject = ['$compileProvider'];

    function config($compileProvider) {
      let currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
      let newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0, -1) + '|chrome-extension:' + currentImgSrcSanitizationWhitelist.toString().slice(-1);

      $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }

    run.$inject = ['$rootScope', 'bungieService'];

    function run($rootScope, bungieService) {
      let p = bungieService.getPlatforms()
        .catch((error) => {
          console.log(error);
        });
    }
}());
