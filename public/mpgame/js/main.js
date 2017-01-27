/*global angular, io*/
(function() {
  'use strict';

  var app, socket;
  app = angular.module('evoApp', []);

// init angular

  socket = io({
    transports: ['websocket'],
    upgrade: true,
    log: true
  });

//static
  function getPlayerFromLocalStorage() {
    var player = {};
    if (localStorage.player) {
      player = JSON.parse(localStorage.player);
    }
    return player;
  }

  var tools = {};
  tools.addOnAndEmit = function($scope, socket) {
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


  app.controller('MainController', function($scope) {

    // fdsf
    tools.addOnAndEmit($scope, socket);

    // get memorised data
    $scope.player = getPlayerFromLocalStorage();

    // stringify helper
    $scope.updatePlayer = function() {
      localStorage.player = JSON.stringify($scope.player);
      $scope.$emit('register-player', $scope.player);
    };

    // callbacks

    // emit directly a register demand
    $scope.$emit('register-player', $scope.player);

    // listeners
    $scope.$on('players-list', function(players) {
      $scope.players = players;
    });



  });


}());
