(function () {
  'use strict'


//var marker;

  /*constructor*/
  var Game = function (UserProto) {
    for(var func in Game.prototype){
      UserProto[func]=this[func]
    }
  };

    Game.prototype = {
      // MARKER managment
      "place-marker-at":function (infos) {
        console.log("new marker");
          this.socket.broadcast.emit('newMarkerAt',infos)
      },
      "move-marker-at":function (infos) {
        console.log("move marker");
        this.socket.broadcast.emit('moveMarker',infos)
      },
      "delete-marker":function (infos) {
          console.log("delete marker");
          this.socket.broadcast.emit('deleteMarker',infos)
      },
      // MDJ management
      "turn-player":function (id) {
        this.socket.broadcast.emit(id,'changeTurn')
      },
  };

  module.exports = Game;

}())
