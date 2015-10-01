(function() {
  'use strict';

  angular.module('dimApp')
    .directive('dimItemViewer', ItemViewer);

  ItemViewer.$inject = [];

  function ItemViewer() {
    return {
      controller: ItemViewerCtrl,
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      link: Link,
      template: [
        '<div ng-if="vm.item !== null" class="itemViewer item-page">',
'<section class="item-aside"><img style="margin-top:1em;" ng-src="{{ \'https://www.bungie.net\' + vm.item.icon }}"><h2>{{ vm.item.name }}</h2><h4 style="margin-bottom: 1em;">{{ vm.item.description }}</h4>',
'  <div class="primary-stat">',
'    <div class="name">Attack</div>',
'    <div class="value">',
'      <span class="min">150</span>',
'      <span class="max"> / 150</span>',
'    </div>',
'  </div>',
'  <dl class="details">',
'    <dt>Quality Level</dt>',
'    <dd>60</dd>',
'    <dt>Tier</dt>',
'    <dd>Legendary</dd>',
'  </dl>',
'  <div class="primary-stats">',
'    <div class="stat">',
'      <div class="stat-name">Rate of Fire</div>',
'      <div class="stat-progress">',
'        <div class="stat-progress-value" style="width: 88%"></div>',
'      </div>',
'      <div class="stat-value">',
'        <span class="stat-value-min">88</span>',
'        <span class="stat-value-max">/ 88</span>',
'      </div>',
'    </div>',
'    <div class="stat">',
'      <div class="stat-name">Impact</div>',
'      <div class="stat-progress">',
'        <div class="stat-progress-value" style="width: 5%"></div>',
'      </div>',
'      <div class="stat-value">',
'        <span class="stat-value-min">8</span>',
'        <span class="stat-value-max">/ 8</span>',
'      </div>',
'    </div>',
'    <div class="stat">',
'      <div class="stat-name">Range</div>',
'      <div class="stat-progress">',
'        <div class="stat-progress-value" style="width: 19%"></div>',
'      </div>',
'      <div class="stat-value">',
'        <span class="stat-value-min">25</span>',
'        <span class="stat-value-max">/ 29</span>',
'      </div>',
'    </div>',
'    <div class="stat">',
'      <div class="stat-name">Stability</div>',
'      <div class="stat-progress">',
'        <div class="stat-progress-value" style="width: 50%"></div>',
'      </div>',
'      <div class="stat-value">',
'        <span class="stat-value-min">44</span>',
'        <span class="stat-value-max">/ 75</span>',
'      </div>',
'    </div>',
'    <div class="stat">',
'      <div class="stat-name">Reload</div>',
'      <div class="stat-progress">',
'        <div class="stat-progress-value" style="width: 90%"></div>',
'      </div>',
'      <div class="stat-value">',
'        <span class="stat-value-min">85</span>',
'        <span class="stat-value-max">/ 96</span>',
'      </div>',
'    </div>',
'    <div class="stat">',
'      <div class="stat-name">Magazine</div>',
'      <div class="stat-values">',
'        <span>31</span>',
'        <span>/ 31</span>',
'      </div>',
'    </div>',
'  </div>',
'  <dl class="secondary-stats">',
'    <dt>Light</dt>',
'    <dd>',
'      <span>18</span>',
'      <span>/ 18</span>',
'    </dd>',
'    <dt>Optics</dt>',
'    <dd>',
'      <span>15</span>',
'      <span>/ 18</span>',
'    </dd>',
'    <dt>Inventory Size</dt>',
'    <dd>',
'      <span>55</span>',
'      <span>/ 55</span>',
'    </dd>',
'    <dt>Equip Speed</dt>',
'    <dd>',
'      <span>88</span>',
'      <span>/ 103</span>',
'    </dd>',
'    <dt>Aim assistance</dt>',
'    <dd>',
'      <span>75</span>',
'      <span>/ 80</span>',
'    </dd>',
'    <dt>Recoil direction</dt>',
'    <dd>',
'      <span>60</span>',
'      <span>/ 60</span>',
'    </dd>',
'  </dl>',
'<div style="text-align: center; margin: 0 auto;"><div style="display: inline-block; margin-right: 20px;">Provided by</div><img style="vertical-align: middle;" src="/images/dtr-logo.png"></div></section>',
'</div>'
      ].join('')
    };

    function Link(scope, element) {}
  }

  ItemViewerCtrl.$inject = ['$scope', '$rootScope'];

  function ItemViewerCtrl($scope, $rootScope) {
    var vm = this;

    vm.item = null;

    $rootScope.$on('dim-store-item-selected', function(e, args) {
      if (args.selected) {
        vm.item = args.item;
        $('body').toggleClass('showItemViewer', true);
      } else {
        if ((vm.item !== null) && (vm.item.id != args.item.id)) {
          vm.item = args.item;
          $('body').toggleClass('showItemViewer', true);
        } else {
          vm.item = null;
          $('body').toggleClass('showItemViewer', false);
        }
      }
    });
  }

}());
