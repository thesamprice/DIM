(function() {
  'use strict';

  angular.module('app.settings').factory('settingsService', SettingsService);

  SettingsService.$inject = ['$q'];

  function SettingsService($q) {
    let service = {
      initialize: initialize,
      save: save,
      settings: {}
    };

    return service;

    function initialize() {
      // Get settings from a specific services if available.
    }

    function save() {
      // Save the current settings to the services.
    }
  }
}());
