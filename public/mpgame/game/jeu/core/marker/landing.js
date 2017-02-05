
define(['pion'], function(Pion) {
    

    Landing= function(marker){
        this.marker=marker;
        var res = new Pion(marker.image,marker.joueur);
        res.sprite.alpha=0.5;
        res.sprite.inputEnabled=false;
        this.fantome=res
    };

    Landing.prototype={
        
        moveCallback:function(){
            // fantome
            if(this.fantome.collider.placeIf()){
                this.fantome.collider.return.call()
                this.marker.ok=true;
            }else{this.marker.ok=false};
        },
        cancel:function name(arg) {
            this.clean()
        },
        mouseCallback:function() {
            // delete fantome
            this.clean();
            if (this.marker.collider.placeIf()) {
                this.marker.collider.return.call();
                // if (this.marker.landing) {
                //     evo.socket.emit("place-marker-at",[this.marker.image,this.marker.joueur.id,this.marker.pos]);
                //     this.marker.landing=false//but its no more landing
                // }else{
                //     evo.socket.emit("move-marker-at", [this.marker.joueur.id,this.marker.id,this.marker.pos]);
                // };
            };
            this.marker.sprite.inputEnabled=true;
        },
        clean:function () {
            this.marker.joueur.game.input.moveCallbacks=[];
            this.fantome.visible=false;
        },
    }

    return Landing
})
