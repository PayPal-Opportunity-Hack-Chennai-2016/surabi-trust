'use strict';

angular

.module('starter')

.controller('IndexController', IndexController);

IndexController.$inject=['localStorageService', '$scope', '$state', '$stateParams','IndexService']

function IndexController(localStorageService, $scope, $state, $stateParams,IndexService){
  IndexService.getdata().then(function(res){
    $scope.allcourses = res.data.courses;
    console.log($scope.allcourses)
  });

  $scope.getStudents = function(c) {
    return _.filter(c, function(s){
      return _.each(s.slots, function(p){
        return p.student_id;
      })
    }).length;
  }

}