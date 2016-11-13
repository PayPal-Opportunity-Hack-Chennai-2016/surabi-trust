(function() {
    'use strict';

    angular
        .module('app.category')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'category',
            config: {
                url: '/category/:id',
                templateUrl: '/student/app/category/category.html',
                controller: 'CategoryController',
                controllerAs: 'vm',
                title: 'Category View'
            }
        }];
    }
})();
