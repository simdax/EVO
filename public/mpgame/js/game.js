
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

  $scope.$on('createGame',function (gameInfos) { // game infos are seed and nb players

          if($scope.status=="createur"||$scope.status=="player")
          {
            var phaser=new Phaser.Game(1500,630,Phaser.AUTO,'phaser');
            var game=new Game(phaser,gameInfos[0],$scope.id,gameInfos[1]); // id is the player you play
            // we have only one state
            new GameCallbacks(evo.socket,game).init("board");
          }
        }
      )


  })

  }())
