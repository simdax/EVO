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
    tools.addOnAndEmit($scope, socket);
    // var $on, $emit;

    // $emit = function(key, data, callback) {
    //   socket.emit(key, data, function(a, b, c) {
    //     $scope.$apply(function() {
    //       return callback && callback(a, b, c);
    //     });
    //   });
    // };

    // $on = function(key, callback) {
    //   socket.on(key, function(res) {
    //     $scope.$apply(function() {
    //       return callback(res);
    //     });
    //   });
    // };

    // $scope.logs = [];
    $scope.player = getPlayerFromLocalStorage();
<<<<<<< Updated upstream

    // $scope.myname = 'simon';
    $scope.updatePlayer = function() {
=======
    // stringify helper
    $scope.updateConf = function() {
>>>>>>> Stashed changes
      localStorage.player = JSON.stringify($scope.player);
      $scope.$emit('register-player', $scope.player);
    };

    $scope.$emit('register-player', $scope.player);

    $scope.$on('players-list', function(players) {
      $scope.players = players;
    });



  });


}());
