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
      joueur:function () {
        return playerRegister.findPlayerForID(this.socket.id);
      },

      // broadcasting
      broadcastPlayersList:function () {

        var names=playerRegister.names();
        this.broadcast('players-list', names);

        // since its managed by PlayerRegister
        // we have to update ourselves games names
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
        console.log("lets join the party !!");
        var game=gameManager.games[id];
        // increase count
        game.players+=1;
                // you get an ID and a seed7
        this.id=game.players;
        this.socket.emit('get-ID',game.players);
        if (game.players>=1) {
          console.log("oui");
          this.broadcast('createGame',game.seed);
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
