(function() {
    'use strict';

    angular
        .module('app.find_mentor')
        .controller('MentorController', MentorController);

    MentorController.$inject = [];

    /* @ngInject */
    function MentorController() {
        var vm = this;

        activate();

        function activate() {
          $('.chips-initial').material_chip({
             data: [{
               tag: 'Algebra',
             }, {
               tag: 'Numerical Methods',
             }],
           });
        }
    }
})();
