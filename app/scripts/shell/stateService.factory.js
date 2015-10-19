(function() {
  'use strict';

  angular.module('app').factory('stateService', StateService);

  StateService.$inject = [];

  function StateService() {
    let service = {
      platform: null
    };

    return service;
  }
}());
