'use strict';

angular

.module('starter')

.factory('LoginService', loginService);

loginService.$inject = ['$http', 'AuthService', 'CacheService'];

function loginService($http, AuthService, CacheService) {

	return {

		login : login,
		forgotPassword: forgotPassword,
		logout: logout
	}

	function login(data) {

		console.log("inside login service");	
		

		return $http({
                    method : 'POST',
                    url    : API_ENDPOINT.login,
                    data   : data
                })
		
	}

	function forgotPassword(email) {
		return $http({
			method : 'POST',
			url    : API_ENDPOINT.forgotPassword,
			data   : { email: email }
		})
	}

	function logout() {
		
		return '';
	}

}