(function() {
  'use strict';

  var Broadcaster=function (playersManager,gameManager,chat) {
    this.playerRegister=playersManager;
    this.gameManager=gameManager;
    this.chat=chat;
  };
  Broadcaster.prototype={
    broadcastAll: function (key,arg) {
      for (var pId in this.playerRegister.players) {
        this.playerRegister.players[pId].socket.emit(key,arg);
      }
    },
    broadcastMinus:function (id,key,arg) {
      for (var pId in this.playerRegister.players) {
        if (pId!=id) {
          this.playerRegister.players[pId].socket.emit(key,arg);
        }
      }
    },
    // broadcasting
    broadcastPlayersList:function () {

      var names=this.playerRegister.names();
      this.broadcastAll('players-list', names);

      // since its managed by PlayerRegister
      // we have to update ourselves games names
      // too
      this.gameManager.getGames().forEach((game,i)=>{
        // console.log(game);
        game.owner=names[i]
      })
      this.broadcastGamelist()
      //return callback && callback(null)
    },
    broadcastGamelist: function () {
      this.broadcastAll('games-list', this.gameManager.getGames())
      //return callback && callback(null)
    },
    updateChat:function () {
      this.br.broadcastAll('updateChat',phrases.slice(Math.max(phrases.length - 5, 1)))
    },
  };


module.exports = Broadcaster

}());
