(function () {
  'use strict'


//var marker;

  /*constructor*/
  var Game = function (mainProto,m) {

  //  marker =m
    // extends Main
    for(var func in Game.prototype){
      mainProto[func]=this[func]
    }

  };


    Game.prototype = {


      // MARKER managment

      "place-marker-at":function (pion) {
        console.log("new marker");
          this.broadcastMinus(this.socket.id,'newMarkerAt',pion)
      },
      "move-marker-at":function (pion) {
        console.log("move marker");
        this.broadcastMinus(this.socket.id,'movePion',pion)
      },
      "delete-marker":function (id) {
          console.log("delete marker");
          this.broadcastMinus(this.socket.id,'deleteMarker',id)
      },

      // MDJ management

      "turn-player":function (id) {
        this.broadcastMinus(id,'changeTurn')
      },

  };

  module.exports = Game;

}())
