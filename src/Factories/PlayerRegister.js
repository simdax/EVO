(function () {
'use strict'

/*constructor*/
var PlayerRegister= function() {
    this.players = {};
}

/*Users functions ==> add/delete and change Status*/

 /*receive a player*/
  PlayerRegister.prototype.registerPlayer = function(socket, player) {
    player.socket = socket;
    player.status = "squatteur"
    this.players[socket.id] = player;
  };

  /* delete a player*/
  PlayerRegister.prototype.removePlayer = function(socket) {
    delete this.players[socket.id];
  };

  /* change status of player */
  // PlayerRegister.prototype.changeStatus = function (id,role) {
  //     this.findPlayerForID(id).status=role
  // };

// utilities for "player data manipulation"

PlayerRegister.prototype.findPlayerForID = function(id) {
    var res;
    for(var i in this.players){
    if (this.players[id]) {
      res=this.players[id]
    }
  }
    if (res) { return res} else{
      console.log("joueur inconnu !! ==> id : " + id)
      return {name:"un mec inconnu"}
    }
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


  module.exports = PlayerRegister
}())
