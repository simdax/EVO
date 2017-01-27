/*
  barre de créations de games
*/

(function(){
  'use strict'

  evo.app.controller('gamesList',function ($scope) {

    evo.tools.addOnAndEmit($scope,evo.socket)

    $scope.$emit('askGameList',function () {})
    /*
    ici on définit les fonctions de création de parties
    */
    $scope.newGame=function () {
          var re=$scope.$emit('newGame');
          $scope.games=[re]
    }

    $scope.$on('games-list',function (games) {
      $scope.games=games
    })
    $scope.changeStatus=function(status){
        $scope.$emit('change-status',status)
    }

    })

  }())
