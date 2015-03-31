'use strict';

angular.module("chromeStorage",[])
	.factory('chromeStorage', function($q) {
	var area = null;
	try {
		// area = chrome.storage.local; // change this to chrome.storage.sync for sync capabilities
		area = localStorage;
	} catch (err) {
		console.log("could not initiate chrome local storage: " + err);
	}

	return {
  clearCache: function() {
		area.clear();
	},
	drop: function(key) {
		area.removeItem(key);
	},
	get: function(key) {
		var deferred = $q.defer();
		deferred.resolve(area.getItem(key));
		return deferred.promise;
	},
	set: function(key, value) {
		area.setItem(key, value);
	},


   }
});
