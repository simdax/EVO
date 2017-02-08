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
    var Chat=require('./Factories/Chat')
    var chat=new Chat;

    function User (socket){

        // so we instantiante with a new User
        // it just extends User prototype
        new Game(User.prototype);

        this.gameManager=gameManager;
        this.playerRegister=playerRegister;
        this.broadcaster=broadcaster;
        
        this.socket=socket;
        Object.keys(User.prototype).forEach((func)=>{
            socket.on(func, this[func].bind(this))
        })

        // add a broadcaster object

        // petite musique de bienvenue
//        this.socket.broadcast.emit("welcome")

    };


    /*define the functions*/

    User.prototype={

        /*helper for broadcasting */

        // players management

        'disconnect': function() {
            console.log('user disconnect');
            this.playerRegister.removePlayer(this.socket);
            this.gameManager.deleteGame(this.socket.id)
            this.broadcaster.broadcastPlayersList();

            delete this
            // gros truc de bourrin ?
        },

        "register-player": function(player, callback) {
            this.playerRegister.addPlayer(this.socket, player);
            this.broadcaster.broadcastPlayersList();
            // ouuuuh yeah very ugly updating chat
            console.log('user registered');
            User.prototype['new-phrase'].call(this);
            return callback && callback(null);
        },

        /*not io function, just static*/
        me:function () {
            return this.playerRegister.findPlayerForID(this.socket.id);
        },
        joueur:function (id) {
            return this.playerRegister.findPlayerForID(id);
        },


        'new-phrase':function (phrase) {
            // or update whitout arg
            // internallye, we add the id and not the name, and we put the name after
            if(phrase){
                chat.add(phrase, this.socket.id)

            };
            // braodcast with your name
            // it works because the size of lasts and the get phrases function is always the same
            var phrases=chat.lastEls();
            for (var i = 0; i < phrases.length; i++) {
                if(phrases[i].match(this.socket.id))
                {chat.lasts[i]=phrases[i].replace(this.socket.id,this.me().name)};
            };
            // broadcast the final 5 el
            this.broadcaster.broadcastAll('updateChat',chat.lasts)
        },

        /*
          GAME
        */

        // game managment
        "new-game": function (infoGame,callback) {

            var game=this.gameManager.createGame(this.socket.id,infoGame.name,this.me().name,infoGame.nb);
            this.broadcaster.broadcastGamelist();

            // like you were joigning your own game
            // (stupid but ok)
            this.joinGame(game.id);
            //return callback && callback(null)
        },
        "cancel-game": function (undefined, callback) {
            console.log("game cancelled");
            this.gameManager.deleteGame(this.socket.id);
            this.broadcaster.broadcastGamelist();
//            return callback && callback(null)
        },
        joinGame:function (id) {
            console.log("u join");

            // we join a game that our gameManager
            // already created
            var game=this.gameManager.games[id];

            // we increase count and give player its id
            this.socket.emit('getID',game.players);

            // we increase the count
            game.players+=1;
            // and if its ok
            if (game.players==game.nb) {
                // boum
                game.playersNotOk=game.nb;
                console.log("nouvelle partie commencée");
                this.broadcaster.broadcastAll('createGame',
                                         // i cant send a object ,??
                                         [game.seed,game.nb,id]);
            }
        },
        unjoinGame:function (id) {
            this.gameManager.games[id].players-=1;
        },

        // for player arrival
        askGameList: function () {
            this.socket.emit('games-list',this.gameManager.games)
            //return callback && callback(null)
        },
    };


    module.exports = User

}()
)
