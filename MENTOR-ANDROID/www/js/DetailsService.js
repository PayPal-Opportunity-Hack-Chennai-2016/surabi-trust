'use strict';

angular

.module('starter')

.factory('DetailService', DetailService);

DetailService.$inject = ['$http','AuthService'];

function DetailService($http, AuthService) {

	return {
		getdata : getdata,
		getenrolled : getenrolled
	}

	function getdata(data) {
		return $http({
                    method : 'GET',
                    url    : API_ENDPOINT.coursebyid + "?id=" + data,
                    headers : {
                    	'x-auth-token' : AuthService.getToken()
                    }
                })
		
	}

	function getenrolled(data) {
		return $http({
                    method : 'GET',
                    url    : API_ENDPOINT.enrolled + "?id=" + data,
                    headers : {
                    	'x-auth-token' : AuthService.getToken()
                    }
                })
		
	}

}