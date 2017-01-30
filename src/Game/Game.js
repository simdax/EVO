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

      "place-marker-at":function (id,image,joueur,pos) {
        if (this.ids[id]) {
          this.broadcastMinus(this.socket.id,'movePion',id,pos)
        }else{
          this.ids[id]=pos;
          this.broadcastMinus(this.socket.id,'newMarkerAt',
          {image:image,joueur:joueur,pos:pos}
        )
        }
        console.log(this.ids);
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
