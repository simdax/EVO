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

  var GM=require('./Factories/GameManager');
  var PR=require('./Factories/PlayerRegister');

  /*instantiate them*/

  var gameManager=new GM;
  var playerRegister=new PR;

  var BR=require('./Factories/Broadcaster')
  var broadcaster=new BR(playerRegister,gameManager);

// Games is just an extension with marker managment functions added
// we dont need to manage anything ON the server with game
// its really pure communication server/client
  var Game=require('./Game')
  var Chat=require('./Chat')

  var chat=new Chat;

  function User (socket){

    // so we instantiante with a new User
    // it just extends User prototype
    new Game(User.prototype);
    new Chat(User.prototype);

    this.socket=socket;
    Object.keys(User.prototype).forEach((func)=>{
      socket.on(func, this[func].bind(this))
    })

    // add a broadcaster object
    this.br =  broadcaster
    this.chat= chat
  };


    /*define the functions*/

    User.prototype={

  /*helper for broadcasting */


      // players management

      'disconnect': function() {
        console.log('user disconnect');
        playerRegister.removePlayer(this.socket);
        gameManager.deleteGame(this.socket.id)
        this.br.broadcastPlayersList();
        // no callback return ?
      },

      "register-player": function(player, callback) {
        playerRegister.registerPlayer(this.socket, player);
        this.br.broadcastPlayersList();
        // ouuuuh yeah very ugly updating chat
        console.log(    User.prototype['new-phrase']);
        User.prototype['new-phrase'].call(this);
        return callback && callback(null);
      },

      /*not io function, just static*/
      me:function () {
        return playerRegister.findPlayerForID(this.socket.id);
      },
      joueur:function (id) {
        return playerRegister.findPlayerForID(id);
      },


      'new-phrase':function (phrase) {
        // or update whitout arg
        // internallye, we add the id and not the name, and we put the name after
          if(phrase){this.chat.add(phrase, this.socket.id)};

          // braodcast with your name
          var phrases=this.chat.getPhrases();
          for (var i = 0; i < phrases.length; i++) {
            console.log(phrases);
            phrases[i]=phrases[i].replace(this.socket.id,this.me().name);
            console.log(this.me().name);
            console.log(phrases);
          }
          // broadcast the final 5 el
          this.br.broadcastAll('updateChat',phrases)
      },

      /*
      GAME
      */

      // game managment
      "new-game": function (name,callback) {
        var game=gameManager.createGame(this.socket.id,name,this.me().name);
        this.br.broadcastGamelist();
        // like you were joigning your own game
        // (stupid but ok)
        this.joinGame(game.id);
        return callback && callback(null)
      },
      "cancel-game": function (undefined, callback) {
        console.log("game cancelled");
        gameManager.deleteGame(this.socket.id);
        this.br.broadcastGamelist();
        return callback && callback(null)
      },
      joinGame:function (id) {
        console.log("u join");

        // we join a game that our gameManager
        // already created
        var game=gameManager.games[id];

        // we increase count and give player its id
        this.socket.emit('getID',game.players);

        // we increase the count
        game.players-=1;
        // and if its ok
        if (game.players==0) {
          // boum
          this.br.broadcastAll('createGame',
          // i cant send a object ,??
          [game.seed,game.nb]);
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


  module.exports = User

}()
)
