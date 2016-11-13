(function() {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$stateParams', 'apiEndpoints', '$http', 'authService', 'cacheService'];

    /* @ngInject */
    function CategoryController($stateParams, apiEndpoints, $http, authService, cacheService) {
        var vm = this;

        vm.type = $stateParams.id;

        vm.student_id =

        vm.courses = [];

        vm.enroll = function(c) {
          console.log('opened')
          vm.modal = c;
          $('#modal1').modal();
          $('#modal1').modal('open');
        }

        vm.confirmEnroll = function() {
          var data = {
            course_id : vm.modal._id,
            slot_id   : vm.slot_id,
            student_id: vm.student_id
          }
        }

        vm.getCourses = function() {
          console.log(authService.getToken())
          $http({
            method : 'GET',
            url    : apiEndpoints.path.course + "/all",
            headers: {
              'x-auth-token' : authService.getToken()
            }
          }).then(function(res){

              vm.courses = _.filter(res.data.courses, function(c) {
                return c.type.toLowerCase() == vm.type
              });

              console.log(vm.courses)

          });
        }

        activate();


        function activate() {

            vm.getCourses();

        }
    }
})();
