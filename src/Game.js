(function () {
    'use strict'

    // this is just a broadcast class
    // When you do something, all the others get the information
    // you do your action => all the others do the same

    
    /*constructor*/
    var Game = function (UserProto) {
        for(var func in Game.prototype){
            UserProto[func]=this[func]
        }
    };

    Game.prototype = {

        ready:function(id) {
            var game=this.gameManager.games[id];
            game.playersNotOk-=1;
            console.log("il reste"+game.playersNotOk);
            if (this.gameManager.games[id].playersNotOk==0) {
                this.broadcaster.broadcastAll('start')
            }
        },
        
        // MARKER managment
        newMarker:function (infos) {
            console.log("new marker");
            this.socket.broadcast.emit('newMarker',infos)
        },
        moveMarker:function (infos) {
            console.log("move marker");
            this.socket.broadcast.emit('moveMarker',infos)
        },
        deleteMarker:function (infos) {
            console.log("delete marker");
            this.socket.broadcast.emit('deleteMarker',infos)
        },
        // MDJ management
        changeTurn:function () {
            console.log("turn changed");
            this.socket.broadcast.emit('changeTurn')
        },
    };

    module.exports = Game;

}())
