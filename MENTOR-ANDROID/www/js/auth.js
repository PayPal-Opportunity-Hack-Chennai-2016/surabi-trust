'use strict';


angular

.module('starter')

.factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$state'];

function AuthService($http, $state){

	var auth = {
		init 			: init,
		isAuthenticated : isAuthenticated,
		getToken 		: getToken,
		setToken		: setToken,
		getAuth			: getAuth,
		setAuth			: setAuth,
		removeToken		: removeToken,
		sessionToken    : sessionToken,
		clearSession    : clearSession
	};

	return auth;

	var sessionToken = '';

	function init() {
		// Get the session token from storage if available
		console.log(this.getToken())
		this.sessionToken = this.getToken();
	}

	function isAuthenticated() {
		return !! this.getToken();
	}

	function getToken() {
		return window.localStorage.getItem('token');
	}

	function setToken(token) {
		window.localStorage.setItem('token', token);
	}

	function getAuth() {
		return window.localStorage.getItem('authorisation');
	}

	function setAuth(token) {
		window.localStorage.setItem('authorisation', token);
	}

	function removeToken() {
		window.localStorage.removeItem('token');
	}	

	function clearSession() {
		window.localStorage.clear();
		$state.go('login');
	}
}