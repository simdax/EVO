
(function(){
    'use strict'

    evo.app.controller('game',function ($scope) {

        evo.tools.addOnAndEmit($scope,evo.socket)
        $scope.prout=true;
        /*
          LISTENERS
        */

        // when you join a party, you have to know wich player you are
        
        $scope.$on('getID',function (id) {
            $scope.id=id;
        });

        $scope.test1=function() {
            if(evo.game &&
               evo.game.board.mdj.currentJoueur==$scope.id){
                evo.network.changeTurn()};
        };
        $scope.land=function() {
            if(evo.game &&
               evo.game.board.mdj.currentJoueur==$scope.id){
                evo.network.dict.land.call(evo.game.board)
            };
        };
        $scope.changeProut=function() {
            $scope.phrase="fsdfds"
        };
        evo.gameScope=$scope

        /////////
        ///MAIN FUNCTION
        /////////

        $scope.$on('createGame',function (gameInfos) { // game infos are seed and nb players

            if( $scope.status=="createur" || $scope.status=="player" )
            {
                var phaser=new Phaser.Game(1000,600,Phaser.AUTO,'phaser');
                // id is the player you play
                // gameID is the game you play 
                evo.game=new evo.Game(phaser,gameInfos[0],$scope.id,gameInfos[1],gameInfos[2]);
                evo.network=new evo.Network(evo.socket,evo.game);
            }
        }
                  )
        

    })

}())
