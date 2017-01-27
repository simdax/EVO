(function () {
'use strict'

/*constructor*/
var PlayerRegister= function() {
    this.players = {};
}

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
    var pId, playersName=[]
//    playersName = this.players.map((player)=>{return player.name})
    for (pId in this.players) {
      playersName.push(this.players[pId].name);
    }
    for (pId in this.players) {
      this.players[pId].socket.emit('players-list', playersName);
    }
  };

  module.exports = PlayerRegister
}())
