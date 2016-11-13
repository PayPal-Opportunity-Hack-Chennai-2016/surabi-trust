'use strict';

/**
 * @ngdoc function
 * @name rigor_one.service:CacheService
 * @description
 * # CacheService
 * Service for cache of the rigor_one app
 */

angular

.module('starter')

.factory('CacheService', cacheService);

cacheService.$inject = ['$http'];

function cacheService($http){

	var cache = {
		getItem    : getItem,
		setItem    : setItem,
		removeItem : removeItem,
		clearCache : clearCache
	};

	return cache;

	function getItem(key) {
		var data = window.localStorage.getItem(key);
		var expires = window.localStorage.getItem('expires_'+key);
		if(expires && expires < Date.now()) {
			return null;
		}
		else if(data){
			return JSON.parse(data);
		}
		else {
			return null;
		}
	}

	function setItem(key, data, expiration) {
		var value = JSON.stringify(data);
		if(expiration) {
			var expiry_time = Date.now() + CACHE_EXPIRES_MIN;
			window.localStorage.setItem('expires_'+key, expiry_time);
		}
		window.localStorage.setItem(key,value); 
	}

	function removeItem (key) {
		window.localStorage.removeItem(key);
	}

	function clearCache() {
		window.localStorage.clear();
	}

}
