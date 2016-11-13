'use strict';

angular

.module('starter')

.controller('loginController', loginCtrl);

loginCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicModal','$ionicLoading','LoginService','AuthService','CacheService' ,'$ionicPopup'];

function loginCtrl($scope, $rootScope, $state, $stateParams, $ionicModal, $ionicLoading, LoginService, AuthService, CacheService, $ionicPopup) {

	$ionicLoading.hide();


	// If the user is already logged in, take him to homepage
	if( AuthService.isAuthenticated() ) {
		$state.go('home');
	}

	// Remove the earlier credentials & data
	CacheService.clearCache();

	$scope.formData = {};

	$scope.data = {};

    var validate = function() {
		return $scope.formData.email && $scope.formData.password;
	}

	var successHandler = function(d) {

		AuthService.setToken(d.data.token);
		console.log(d.data);
		// Set Cache expiration time for username & authority
		CacheService.setItem('username',d.data.user);

		$rootScope.username = d.data.user.name;

		CacheService.setItem('authority',d.data.authority);
		CacheService.setItem('authorities',d.data.authorities);
		// Prevent user from coming back to this page by pressing back btn

		$scope.formData = {};

		$state.go('home');
		// Get the profile data
		$ionicLoading.hide();

 		// Once the user has been loggedIn, redirect to home page
		

		
	}

	var errorHandler = function(e) {

		AuthService.clearSession();
		// Hide the loader
		$ionicLoading.hide();
		// Popup to show the error
		var alertPopup = $ionicPopup.alert({
	       title: 'Invalid Credentials',
	       template: 'You have entered an invalid username / password'
	     });

	    alertPopup.then(function(res) {
	       if(res) {
	         $scope.formData.password = "";
	       }
	    });

	    
	}

	$scope.loginSubmit = function() {


		// Validate the email & password before logging in
			$ionicLoading.show();
			// Invoke the login service to authenticate
			// Returns a promise
			console.log("inside login controller");
			console.log($scope.formData.email);
			console.log($scope.formData.password);
			$scope.data= {
				email: $scope.formData.email,
				password: $scope.formData.password
			}
			console.log($scope.data);
			console.log($scope.data.email);

			LoginService
			.login($scope.data)
			.then(successHandler, errorHandler);

	}
}