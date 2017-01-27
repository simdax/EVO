(function () {
'use strict'

/*constructor*/
var PlayerRegister= function() {
    this.players = {};
}

 /*receveive a player*/
  PlayerRegister.prototype.registerPlayer = function(socket, player) {
    player.socket = socket;
    player.status = "invité"
    this.players[socket.id] = player;
  };

  /* kill a player*/
  PlayerRegister.prototype.removePlayer = function(socket) {
    delete this.players[socket.id];
  };

    /*why this dont work ??*/
  //  var caca = Object.keys(this.players).map((player)=>{return player.name});
  //  console.log(typeof caca); // we want array, not object...
  PlayerRegister.prototype.names = function () {
    var res=[]  ;
    for (var pId in this.players) {
      res.push(this.players[pId].name);
    }
    return res
  };
  PlayerRegister.prototype.broadcast=function (key,arg) {
    for (var pId in this.players) {
      this.players[pId].socket.emit(key,arg);
    }
  };

  module.exports = PlayerRegister
}())
