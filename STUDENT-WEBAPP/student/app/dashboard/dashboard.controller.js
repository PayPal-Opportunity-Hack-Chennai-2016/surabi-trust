(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['logger', '$state', '$scope', '$rootScope', '$timeout', 'authService', 'cacheService'];

    /* @ngInject */
    function dashboardController(logger, $state, $scope, $rootScope, $timeout, authService, cacheService) {
        var vm = this;

        $rootScope.page = "dashboard";

        activate();

        function activate() {

        }
    }
})();
