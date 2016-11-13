'use strict';

angular

.module('starter')

.controller('detailController', detailController);

detailController.$inject=['localStorageService', '$scope', '$state', '$stateParams','DetailService','CacheService']

function detailController(localStorageService, $scope, $state, $stateParams,DetailService,CacheService){
  
  $scope.cid = $stateParams.cid
  console.log($scope.cid)

  $scope.val = true;

  $scope.user = CacheService.getItem('username')
  console.log($scope.user);

  DetailService.getdata($scope.cid).then(function(res){
    $scope.course = res.data.course;
    console.log($scope.course);
  });

/*  DetailService.getdata($scope.cid).then(function(res){
    $scope.enroll = res.data.course;
    console.log($scope.enroll);
  });*/

  $scope.change = function(){
    console.log($scope.val)
    $scope.val = !$scope.val;
    console.log($scope.val)
  }


}
