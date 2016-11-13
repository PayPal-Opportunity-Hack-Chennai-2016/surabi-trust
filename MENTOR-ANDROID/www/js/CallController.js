(function(){
    angular.module('starter')
    .controller('CallController', ['localStorageService', '$scope', '$ionicPopup', CallController]);

    function CallController(localStorageService, $scope, $ionicPopup){

            $scope.username = localStorageService.get('username');

            $scope.toCall = JSON.parse(localStorageService.get('toCall'));

            var peer = new Peer($scope.username, {
                key: 'wlye8ujpxhq41jor',
                config: {'iceServers': [
                           { url: 'stun:stun.l.google.com:19302' },
                           { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
                         ]}
              });

           function getVideo(successCallback, errorCallback){
                navigator.webkitGetUserMedia({audio: true, video: true}, successCallback, errorCallback);
            }


            function onReceiveCall(call){

                $ionicPopup.alert({
                    title: 'Incoming Call',
                    template: 'Mentor is calling you. Connecting now..'
                });

                $scope.showVideo = true;

                getVideo(
                    function(MediaStream){
                        call.answer(MediaStream);
                    },
                    function(err){
                        $ionicPopup.alert({
                            title: 'Error',
                            template: 'An error occurred while try to connect to the device mic and camera'
                        });
                    }
                );

                call.on('stream', onReceiveStream);
            }


            function onReceiveStream(stream){
                var video = document.getElementById('contact-video');
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = function(){
                    $ionicPopup.alert({
                        title: 'Call Ongoing',
                        template: 'Call has started. You can speak now'
                    });
                };

            }

            $scope.startCall = function(){

                $scope.showVideo = true;

                var contact_username = "raghav";

                console.log(contact_username)

                getVideo(
                    function(MediaStream){

                        var call = peer.call(contact_username, MediaStream);
                        call.on('stream', onReceiveStream);
                    },
                    function(err){
                        $ionicPopup.alert({
                            title: 'Error',
                            template: 'An error occurred while try to connect to the device mic and camera'
                        });
                    }
                );

            };

            peer.on('call', onReceiveCall);



    }

})();
