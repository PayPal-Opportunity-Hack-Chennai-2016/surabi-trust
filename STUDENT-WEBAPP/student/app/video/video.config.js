(function() {
    'use strict';

    angular
        .module('app.video')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'video',
            config: {
                url: '/video',
                templateUrl: '/student/app/video/video.html',
                controller: 'VideoController',
                controllerAs: 'vm',
                title: 'Video Call'
            }
        }];
    }
})();
