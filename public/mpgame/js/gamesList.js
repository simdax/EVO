/*
barre de créations de games
*/

(function(){
  'use strict'

  evo.app.controller('gamesList',function ($scope) {

    evo.tools.addOnAndEmit($scope,evo.socket)


    /*
    INIT  */

/* 4 status possibles : squatteur, donc rien,
 master 'a créé une game',
 player 'y participe',
et enfin 'watcher', regarde une game déja commencée
*/
    $scope.status="mec qui débarque";

    $scope.started=false;
    //  here maybe a variable for
    //  $scope.musique=false

    //askgamelist demande la liste des parties. c'est à l'arrivée
    // du joueur vu que ça peut pas être mis dans un local storage ?
    $scope.$emit('askGameList',function () {})

    // qui répond automatiquement
    /* avec une réponse à games lists*/

    /*ici on c'est pour les changements de status par rapport aux
    créations de parties
    */

    /*
    LISTENERS

    */

    // status
    $scope.$on('my-status', function(status) {
      $scope.status = status;
    });

    // game list
    $scope.$on('games-list',function (games) {

      // why is game a dictionary with '0','1','2' keys.....
      // and not a pure array ???????

      $scope.games=games;
      for(var i in $scope.games){
        if($scope.games[i].id==evo.socket.id){$scope.games[i].owner="YOU"}
      }
    });


    /*   USED BY HTML
    */

    // status
    $scope.changeStatus = function (role) {
        $scope.status=role
    };
    $scope.joinGame=function (gameID) {
        $scope.$emit('joinGame',gameID);
        $scope.status="player"
//      $scope.$emit('change-status',"player");
    };
    $scope.unjoinGame=function (gameID) {
        $scope.$emit('unjoinGame',gameID);
        $scope.status="squatteur"
//        $scope.$emit('change-status',"squatteur");
    };

    /*
    ici on définit les fonctions de création de parties
    */

    /*ici c'est le bouton on demande une partie*/
    $scope.newGame=function () {
      var name = prompt("Please enter game name", "game de ouf");
      if(name){
        var nb = prompt("combien de joueurs sanguinaires ?", "0");
        if ((parseInt(nb))) {
        $scope.$emit('new-game',name,nb);
        $scope.status="createur"
        $scope.started=true;
      }
      }
    };

    /*et ici qui l'annule*/
    $scope.cancel=function () {
      $scope.$emit('change-status',"squatteur")
      $scope.$emit('cancel-game')
      $scope.started=false
    };

  })

}())
