'use strict';

angular

.module('starter')

.controller('CourseController', CourseController);

CourseController.$inject=['localStorageService', '$scope', '$state', '$stateParams','CourseService']

function CourseController(localStorageService, $scope, $state, $stateParams,CourseService){
  /*$scope.home = IndexService.getdata();
  cosole.log($scope.home)*/
}