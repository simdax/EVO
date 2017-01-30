/*
███    ███  █████  ██ ███    ██
████  ████ ██   ██ ██ ████   ██
██ ████ ██ ███████ ██ ██ ██  ██
██  ██  ██ ██   ██ ██ ██  ██ ██
██      ██ ██   ██ ██ ██   ████

*/





(function(){
  'use strict'

  /*require our managers*/

  var GM=require('./GameManager');
  var PR=require('./PlayerRegister');

  /*instantiate them*/

  var gameManager=new GM;
  var playerRegister=new PR;

// Games is just an extension with marker managment functions added
  var Game=require('../Game/Game')

  /*get the bouzin*/

  function Main (socket){

    //game juste extends Main prototype
    new Game(Main.prototype);
    this.ids={};


    this.socket=socket;
    Object.keys(Main.prototype).forEach((func)=>{
      socket.on(func, this[func].bind(this))
    })
  };


    /*define the functions*/

    Main.prototype={

  /*helper for broadcasting */

      broadcast: function (key,arg) {
    //    console.log(Object.keys(this.players).length);
       for (var pId in playerRegister.players) {
        playerRegister.players[pId].socket.emit(key,arg);
       }
     },
     broadcastMinus:function (id,key,arg) {
            //    console.log(Object.keys(this.players).length);
       for (var pId in playerRegister.players) {
         if (pId!=id) {
         playerRegister.players[pId].socket.emit(key,arg);
       }
       }
     },


      // players management

      'disconnect': function() {
        console.log('user disconnect');
        playerRegister.removePlayer(this.socket);
        gameManager.deleteGame(this.socket.id)
        this.broadcastPlayersList();
        // no callback return ?
      },

      "register-player": function(player, callback) {
        playerRegister.registerPlayer(this.socket, player);
        this.broadcastPlayersList();
        return callback && callback(null);
      },

      /*not io function, just static*/
      me:function () {
        return playerRegister.findPlayerForID(this.socket.id);
      },
      joueur:function (id) {
        return playerRegister.findPlayerForID(id);
      },

      // broadcasting
      broadcastPlayersList:function () {

        var names=playerRegister.names();
        this.broadcast('players-list', names);

        // since its managed by PlayerRegister
        // we have to update ourselves games names
        // too
        gameManager.getGames().forEach((game,i)=>{
          // console.log(game);
          game.owner=names[i]
        })
        this.broadcastGamelist()
        //return callback && callback(null)
      },


      broadcastGamelist: function () {
        this.broadcast('games-list', gameManager.getGames())
        //return callback && callback(null)
      },

      /*
      GAME
      */

      // game managment
      "new-game": function (name,callback) {
        var game=gameManager.createGame(this.socket.id,name,this.me().name);
        this.broadcastGamelist();
        // like you were joigning your own game
        // (stupid but ok)
        this.joinGame(game.id);
        return callback && callback(null)
      },
      "cancel-game": function (undefined, callback) {
        console.log("game cancelled");
        gameManager.deleteGame(this.socket.id);
        this.broadcastGamelist();
        return callback && callback(null)
      },
      joinGame:function (id) {
        console.log("u join");
        var game=gameManager.games[id];
        // increase count
        this.socket.emit('getID',game.players);
        game.players+=1;
        if (game.players>0) {
          this.broadcast('createGame',
          // i cant send a object ,??
          [game.seed,game.players]);
        }
      },
      unjoinGame:function (id) {
        gameManager.games[id].players-=1;
      },


      // for player arrival
      askGameList: function () {
        this.socket.emit('games-list',gameManager.games)
        //return callback && callback(null)
      },
    };


  module.exports = Main

}()
)
