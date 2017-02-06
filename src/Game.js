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
        // MARKER managment
        "newMarkerAt":function (infos) {
            console.log("new marker");
            this.socket.broadcast.emit('newMarkerAt',infos)
        },
        "moveMarker":function (infos) {
            console.log("move marker");
            this.socket.broadcast.emit('moveMarker',infos)
        },
        "deleteMarker":function (infos) {
            console.log("delete marker");
            this.socket.broadcast.emit('deleteMarker',infos)
        },
        // MDJ management
        "changeTurn":function (id) {
            this.socket.broadcast.emit(id,'changeTurn')
        },
    };

    module.exports = Game;

}())
