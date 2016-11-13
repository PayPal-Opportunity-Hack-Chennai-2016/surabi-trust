(function() {
    'use strict';

    angular
        .module('surabi', [
          'app.core',
          'app.layout',
          'app.cache',
          'app.auth',
          'app.login',
          'app.dashboard',
          'app.find_mentor',
          'app.video',
          'app.category'
        ]);
})();
