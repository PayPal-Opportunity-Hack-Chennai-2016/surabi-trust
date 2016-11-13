'use strict';

angular

.module('starter')

.factory('IndexService', IndexService);

IndexService.$inject = ['$http','AuthService'];

function IndexService($http, AuthService) {

	return {
		getdata : getdata
	}

	function getdata(data) {
		return $http({
                    method : 'GET',
                    url    : API_ENDPOINT.allcourse,
                    headers : {
                    	'x-auth-token' : AuthService.getToken()
                    }
                })
		
	}

}