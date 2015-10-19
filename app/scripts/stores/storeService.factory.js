(function() {
  'use strict';

  angular.module('app.stores')
    .factory('storeService', StoreService);

  StoreService.$inject = ['$q', 'bungieService'];

  function StoreService($q, bungieService) {
    var _stores = [];

    var service = {
      getStore: getStore,
      getStores: getStores
    };

    return service;

    function getStore(id) {
      let store = _.find(_stores, (store) => store.id === id);

      return $q.when(store);
    }

    function getStores(getLatest) {
      if (getLatest) {
        return bungieService.getStores()
          .then((rawStores) => {
            let store = null;

            if (_.size(rawStores) > 0) {
              _stores.splice(0, _.size(_stores));
            }

            _.each(rawStores, (rawStore) => {
              if (rawStore.id === 'vault') {
                store = new Vault(rawStore);
              } else {
                store = new Inventory(rawStore);
              }
            })

            _stores.push(store)
          });
      }

      return $q.when(_stores);
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
