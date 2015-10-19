(function() {
  'use strict';

  angular.module('app.stores')
    .factory('StoreService', StoreService);

  StoreService.$inject = [];

  function StoreService() {
    var _stores = [];

    var service = {
      getStore: getStore,
      getStores: getStores
    };

    return service;

    function getStore(id) {
      return _.find(_stores, (store) => store.id === id);
    }

    function getStores() {
      return _stores;
    }
  }

  class Store {
    constructor(destinyStore) {
      this[id] = destinyStore.id;
    }
  }

  class Inventory extends Store {
    constructor(destinyStore) {
      super(destinyStore);

      this[id] = 'vault';
    }
  }

  class Vault extends Store {
    constructor(destinyStore) {
      super(destinyStore);
    }
  }
}());
