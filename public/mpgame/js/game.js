
(function(){
    'use strict'

    evo.app.controller('game',function ($scope) {

        evo.tools.addOnAndEmit($scope,evo.socket)

        /*
          LISTENERS
        */

        // when you join a party, you have to know wich player you are
        
        $scope.$on('getID',function (id) {
            $scope.id=id;
        });

        $scope.phrase="";

        //////////
        ///MAIN FUNCTION
        /////////

        $scope.$on('createGame',function (gameInfos) { // game infos are seed and nb players

            if( $scope.status=="createur" || $scope.status=="player" )
            {
                var phaser=new Phaser.Game(1000,600,Phaser.AUTO,'phaser');
                evo.game=new evo.Game(phaser,gameInfos[0],$scope.id,gameInfos[1],gameInfos[2]); // id is the player you play
                evo.network=new evo.Network(evo.socket,evo.game);
            }
        }
                  )


    })

}())
