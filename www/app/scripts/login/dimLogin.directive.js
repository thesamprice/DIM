(function () {
  'use strict';

  angular.module('dimApp')
    .directive('dimLogin', Login);

  // MovePopup.$inject = ['ngDialog'];

  function Login() {
    return {
      controller: MovePopupController,
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'A',
      scope: {
        store: '=dimStore',
        item: '=dimItem'
      },
      replace: true,
      template: [
        '<div class="move-popup">',
        '  <div dim-move-item-properties="vm.item"></div>',
        '  <div class="locations" ng-repeat="store in vm.stores">',
        '    <div class="move-button move-vault" ng-class="{ \'little\': item.notransfer }" ',
        '      ng-if="vm.canShowVault(vm.item, vm.store, store)" ng-click="vm.MoveToVault(store, $event)" ',
        '      data-type="item" data-character="{{ store.id }}">',
        '      <span>Vault</span>',
        '    </div>',
        '    <div class="move-button move-store" ng-class="{ \'little\': item.notransfer }" ',
        '      ng-if="vm.canShowStore(vm.item, vm.store, store)" ng-click="vm.MoveToGuardian(store, $event)" ',
        '      data-type="item" data-character="{{ store.id }}" style="background-image: url(http://bungie.net{{ store.icon }})"> ',
        '      <span>Store</span>',
        '    </div>',
        '    <div class="move-button move-equip" ng-class="{ \'little\': item.notransfer }" ',
        '      ng-if="vm.canShowEquip(vm.item, vm.store, store)" ng-click="vm.MoveToEquip(store, $event)" ',
        '      data-type="equip" data-character="{{ store.id }}" style="background-image: url(http://bungie.net{{ store.icon }})">',
        '      <span>Equip</span>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('')
    };
  }

  MovePopupController.$inject = ['dimStoreService', 'ngDialog'];

  function MovePopupController(dimStoreService, ngDialog) {
    var vm = this;

    vm.MoveToVault = function MoveToVault(store, e) {
      var current = _.find(vm.store.items, function (item) {
        return ((item.type === vm.item.type) && (vm.item.sort === item.sort) && item.equipped);
      });

      var i = _.indexOf(vm.store.items, vm.item);

      if (i >= 0) {
        vm.store.items.splice(i, 1);
        store.items.push(vm.item);
        vm.item.owner = store.id;
        vm.item.equipped = true;
      }

      i = _.indexOf(vm.store.items, current);

      if (i >= 0) {
        vm.store.items.splice(i, 1);
        store.items.push(current);
        current.owner = store.id;
        current.equipped = false;
      }
    };
  }
})();
