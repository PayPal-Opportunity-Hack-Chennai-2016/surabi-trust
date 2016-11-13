(function(){
    angular.module('starter')
    .controller('userController', ['localStorageService', '$scope', '$state', '$stateParams', userController]);

    function userController(localStorageService, $scope, $state, $stateParams){

          $scope.uid = $stateParams.uid
          console.log($scope.uid)

          $scope.val = true;

          $scope.change = function(){
          console.log($scope.val)
          $scope.val = !$scope.val;
          console.log($scope.val)
          }

    }

})();