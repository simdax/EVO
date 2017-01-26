/*global angular, io*/
(function() {
  'use strict';

  var app, socket;
  app = angular.module('evoApp', []);

  socket = io({
    transports: ['websocket'],
    upgrade: true,
    log: true
  });


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

    // $scope.myname = 'simon';
    $scope.updatePlayer = function() {
      localStorage.player = JSON.stringify($scope.player);
      $scope.$emit('register-player', $scope.player);
    };

    $scope.$emit('register-player', $scope.player);

    $scope.$on('players-list', function(players) {
      $scope.players = players;
    });

    // $scope.scapi = function(cmd, args) {
    //   $emit('cmd', {
    //     cmd: cmd,
    //     args: args || []
    //   }, function(res) {
    //     $scope.logs.push(res);
    //   });
    // };

    // $scope.tf = function(cmd, args) {
    //   return $scope.scapi('trucouf.' + cmd, args);
    // };

    // socket.on('connect', function() {
    //   console.log('connected');
    // });


  });


}());
