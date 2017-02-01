(function () {
  'use strict'


//var marker;

  /*constructor*/
  var Game = function (UserProto,m) {

  //  marker =m
    // extends User
    for(var func in Game.prototype){
      UserProto[func]=this[func]
    }

  };


    Game.prototype = {


      // MARKER managment

      "place-marker-at":function (infos) {
        console.log("new marker");
          this.broadcast('newMarkerAt',infos)
      },
      "move-marker-at":function (infos) {
        console.log("move marker");
        this.broadcastMinus(this.socket.id,'moveMarker',infos)
      },
      "delete-marker":function (infos) {
          console.log("delete marker");
          this.broadcastMinus(this.socket.id,'deleteMarker',infos)
      },

      // MDJ management

      "turn-player":function (id) {
        this.broadcastMinus(id,'changeTurn')
      },

  };

  module.exports = Game;

}())
