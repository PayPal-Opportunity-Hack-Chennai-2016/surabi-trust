(function() {
    'use strict';

    angular
        .module('app.video')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['$scope', '$state', 'cacheService'];

    /* @ngInject */
    function VideoController($scope, $state, cacheService) {
        var vm = this;

        vm.course = cacheService.getCache('course');

        activate();

        function activate() {

          var username = cacheService.getCache('name') || "Anonymous";

          var peer = new Peer(username, {
              key: 'gszfrffxdewxw29',
              config: {'iceServers': [
                         { url: 'stun:stun.l.google.com:19302' },
                         { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
                       ]}
          });

          // Get Video & Audio stream from browser
          function getVideo(successCallback, errorCallback){
              navigator.webkitGetUserMedia({audio: true, video: true}, successCallback, errorCallback);
          }

          // Function Hook on receiving call
          function onReceiveCall(call){

              console.log("RECEIVED CALL")

              swal({
                title: "Incoming Video Call",
                text: "You have an incoming video call.",
                imageUrl: "/student/assets/images/facetime.png",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Attend",
                closeOnConfirm: true
              },
              function(){
                        $("#showIcon").hide()
                        getVideo(
                            function(MediaStream){
                                call.answer(MediaStream);
                            },
                            function(err){
                              sweetAlert("Oops...", "Unable to connect to call", "error");
                            }
                        );

                        call.on('stream', onReceiveStream);

              });


          }

          var start_ = true;

          function onReceiveStream(stream){
              var video = document.getElementById('call-video');
              video.src = window.URL.createObjectURL(stream);
              video.onloadedmetadata = function(){};
          }

          peer.on('call', onReceiveCall);

        }
    }
})();
