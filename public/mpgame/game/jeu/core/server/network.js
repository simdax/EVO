define(function() {

    GameCallbackSocket=function(socket,gameCallBacks) {

        console.log(socket);
        
        this.socket = socket;
        this.dict=gameCallBacks;

        console.log(socket.on);
        console.log(this.socket.on);
        
        //we translate callbacks into socket on event
        for(var key in this.dict){
            this.socket.on(key,function (args) {
                this.dict[key](args)
            }.bind(this))
        };   
    };

    return GameCallbackSocket
    
})
