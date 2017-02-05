// we define the socket's hooks for game callbacks calls


// server communication
define(["callbacks"],function(Callbacks) {
    

    Network=function(socket,game) {

        this.game = game;
        this.socket=socket;
        
        var callback=function(key) {
            this[key]=function() {
                Callbacks[key].apply(this.game.board,arguments);
                this.socket.emit(key,arguments);
            };
        };
        for(var key in Callbacks){
            callback.call(this,key)
        }


    };

    return Network;

})
