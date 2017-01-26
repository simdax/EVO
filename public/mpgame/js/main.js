/*global angular, io*/
(function() {
  'use strict';

  var app, socket;
  app = angular.module('evoApp', []);

  // socket = io({
  //   transports: ['websocket'],
  //   upgrade: true,
  //   log: true
  // });


  function getConf() {
    var player = {};
    if (localStorage.player) {
      player = JSON.parse(localStorage.player);
    }
    return player;
  }



  app.controller('MainController', function($scope) {
    // var $on, $emit;
    // $scope.logs = [];
    $scope.player = getConf();

    // $scope.myname = 'simon';
    $scope.updateConf = function() {
      localStorage.player = JSON.stringify($scope.player);
    };

    // $on = function(key, callback) {
    //   socket.on(key, function(res) {
    //     $scope.$apply(function() {
    //       return callback(res);
    //     });
    //   });
    // };
    // $emit = function(key, data, callback) {
    //   socket.emit(key, data, function(res) {
    //     $scope.$apply(function() {
    //       return callback && callback(res);
    //     });
    //   });
    // };

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
