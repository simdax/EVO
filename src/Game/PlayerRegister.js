(function () {
'use strict'

/*constructor*/
var PlayerRegister= function() {
    this.players = {};
}

/*
  carry on => connection/disconnect
              broadcast playerName

*/

 /*receveive a player*/
  PlayerRegister.prototype.registerPlayer = function(socket, player) {
    player.socket = socket;
    this.players[socket.id] = player;
  };
  /* kill a player*/
  PlayerRegister.prototype.removePlayer = function(socket) {
    delete this.players[socket.id];
  };

  /*  broadcast infos => player.name */
  PlayerRegister.prototype.broadcastPlayersList = function() {
    var playersName=[]
    /*why this dont work ??*/
  //  var caca = Object.keys(this.players).map((player)=>{return player.name});
  //  console.log( caca);
    for (pId in this.players) {
      playersName.push(this.players[pId].name);
    }
    for (var pId in this.players) {
      this.players[pId].socket.emit('players-list', playersName);
    }
  };

  module.exports = PlayerRegister
}())
