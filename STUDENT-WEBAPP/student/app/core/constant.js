(function() {
    'use strict';

    var core = angular.module('app.core');

    var base = "http://localhost:3100";

    var endpoints = {
        login  : base + "/mentor/login",
        course : base + "/course"
    };

    var apiEndpoints = {
      base : base,
      path : endpoints
    }

    core.constant('apiEndpoints', apiEndpoints);

})();
