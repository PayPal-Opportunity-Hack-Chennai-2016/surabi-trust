'use strict';

angular

.module('starter')

.controller('UtilController', UtilController);

UtilController.$inject=['$scope', '$state', '$ionicHistory', '$location','cacheService']

function UtilController($scope, $state, $ionicHistory, $location,cacheService){

  $scope.go = function ( path ) {
    if( path == 'back') {
      $ionicHistory.goBack();
    }
    else {
      $location.path( path );
    }
  };

  $scope.logout = function(){
  	cacheService.clearCache();
  	$state.go('login')
  }

}

