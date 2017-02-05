// gros namespace de bourrin, de porcasse et tutti quanti

/*
  ██    ██  █████  ██████                   ███████ ██    ██  ██████
  ██    ██ ██   ██ ██   ██                  ██      ██    ██ ██    ██
  ██    ██ ███████ ██████                   █████   ██    ██ ██    ██
  ██  ██  ██   ██ ██   ██                  ██       ██  ██  ██    ██
  ████   ██   ██ ██   ██     ██ ██ ██     ███████   ████    ██████
*/


var evo={};

(function() {
    'use strict';

    //init angular

    evo.app = angular.module('evoApp', []
                             //['cfp.hotkeys'] dont work
                            );

    // init socket io

    evo.socket = io({
        transports: ['websocket'],
        upgrade: true,
        log: true
    });

    evo.tools = {};
    evo.tools.addOnAndEmit = function($scope, socket) {
        $scope.$emit = function(key, data, callback) {
            socket.emit(key, data, function(a, b, c) {
                $scope.$apply(function() {
                    return callback && callback(a, b, c);
                });
            });
        };
        $scope.$on = function(key, callback) {
            socket.on(key, function(res) {
                $scope.$apply(function() {
                    return callback(res);
                });
            });
        };
    };

    evo.io=io;
    
}());
