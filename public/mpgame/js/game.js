
// GROS GLOBAL DE TROP PAS BIIIIIENNN !

(function(){
  'use strict'

  evo.app.controller('game',function ($scope) {

    evo.tools.addOnAndEmit($scope,evo.socket)

  /*
  LISTENERS
  */
  $scope.$on('getID',function (id) {
      $scope.id=id;
  });

  $scope.$on('createGame',function (gameInfos) {

          if($scope.status=="createur"||$scope.status=="player")
          {
            var game=new Phaser.Game(1500,630,Phaser.AUTO,'phaser');
            evo.game=new Game(game,gameInfos[0],$scope.id,gameInfos[1]);
          }
        }
      )


  })

  }())
