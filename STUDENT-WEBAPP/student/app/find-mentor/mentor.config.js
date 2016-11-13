(function() {
    'use strict';

    angular
        .module('app.find_mentor')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'find_mentor',
            config: {
                url: '/find_mentor',
                templateUrl: '/student/app/find-mentor/mentor.html',
                controller: 'MentorController',
                controllerAs: 'vm',
                title: 'Find Mentor'
            }
        }];
    }
})();
