/*
███    ███  █████  ██ ███    ██
████  ████ ██   ██ ██ ████   ██
██ ████ ██ ███████ ██ ██ ██  ██
██  ██  ██ ██   ██ ██ ██  ██ ██
██      ██ ██   ██ ██ ██   ████

used to create socket's on func
on :  disconnect
register-player
get-game
change-status
*/

(function(){
  'use strict'


  /*require our managers*/

  var GM=require('./GameManager');
  var PR=require('./PlayerRegister');


  /*instantiate them*/

  var gameManager=new GM;
  var playerRegister=new PR;


  /*define the functions*/

  Main.prototype={
    // players management
    'disconnect': function() {
      console.log('user disconnect');
      playerRegister.removePlayer(this.socket);
      this.broadcastPlayersList();
      // no callback return ?
    },
    "register-player": function(player, callback) {
      playerRegister.registerPlayer(this.socket, player);
      this.broadcastPlayersList();
      return callback && callback(null);
    },
    "change-status": function (status, callback) {
      console.log(status);
      return callback && callback(null)
    },
    // game managment
    "newGame": function (player,callback) {
      gameManager.createGame(player);
      this.broadcastGamelist();
      return callback && callback(null)
    },
    // broadcasting
    broadcastPlayersList:function (undefined,callback) {
      playerRegister.broadcast('players-list', playerRegister.names())
      return callback && callback(null)
    },
    broadcastGamelist:function (undefined, callback) {
      playerRegister.broadcast('games-list', gameManager.games)
      return callback && callback(null)
    },
    // just personal
    askGameList:function () {
      this.socket.emit('games-list',gameManager.games)
      //return callback && callback(null)
    },
    "get-game": function(players, callback) {
      gameManager.createGame()
      //gamemanager.broadcastGamelist
      return callback && callback(game);
    },
  };

  /*get the bouzin*/

  function Main (socket){
    this.socket=socket;
    Object.keys(Main.prototype).forEach((func)=>{
      socket.on(func, this[func].bind(this))
    });
  }

  module.exports = Main

}()
)
