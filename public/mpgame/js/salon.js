(function () {

  // strict parce que sinon Pouya me tape

  'use strict'

  /* static helper de je te chope ton nom dans ta mémoire profonde*/

  function getPlayerFromLocalStorage() {
    var player = {};
    if (localStorage.player) {
      player = JSON.parse(localStorage.player);
    }
    return player;
  }

  /*register players*/

  evo.app.controller('Salon', function($scope) {

    /*here initialize the on and emit for the rests*/
    evo.tools.addOnAndEmit($scope, evo.socket);

      /*
      INIT
      */
    // get memorised name
    $scope.player = getPlayerFromLocalStorage();

    /*   and init gogogo
    emit directly a register demand
    */
    $scope.$emit('register-player', $scope.player);


    /* listeners */

    $scope.$on('players-list', function(players) {
      $scope.players = players;
    });


    /*
     update name if changed
    */
    $scope.updatePlayer = function() {
      localStorage.player = JSON.stringify($scope.player);
      $scope.$emit('register-player', $scope.player);
    };




  });

}())
