// we define the socket's hooks for game callbacks calls


// server communication
define(["callbacks","lang"],function(Callbacks,Lang) {
    

    Network=function(socket,game) {

        this.game = game;
        this.socket=socket;
        this.dict=Callbacks;

        var callback=function(key) {

            var apply=function(args) {
                return  this.dict[key].apply(this.game.board,args)
            }.bind(this);
            
            this.socket.on(key,function(args) {
                console.log("on reçoit "+key+args);
                // object in array conversion, something really strange and ugly...
                apply(Lang.object2Array(args));                 
            });
            
            this[key]=function() {
                this.socket.emit(key,arguments);
                return  apply( [...arguments]);
            };
            
        };
        for(var key in this.dict){
            callback.call(this,key)
        }
        

    };

    return Network;

})
