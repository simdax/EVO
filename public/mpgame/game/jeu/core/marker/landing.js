
define(['pion'], function(Pion) {
    

    Landing= function(marker){
        this.marker=marker;
        var res = new Pion(marker.image,marker.joueur);
        res.sprite.alpha=0.5;
        res.sprite.inputEnabled=false;
        res.collider.always=true;
        this.fantome=res;
    };

    Landing.prototype={
        
        moveCallback:function(){
            // fantome
            if(this.fantome.collider.placeIf()){
               // this.fantome.collider.go(this.)
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
                this.marker.collider.return();
                console.log(this.marker);
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
