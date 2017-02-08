//  _              _ _
// | |__ _ _ _  __| (_)_ _  __ _
// | / _` | ' \/ _` | | ' \/ _` |
// |_\__,_|_||_\__,_|_|_||_\__, |
//                         |___/


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
                console.log("movecallback");
               // this.fantome.collider.go(this.)
                this.marker.ok=true;
            }else{this.marker.ok=false};
        },
        mouseCallback:function() {
            // delete fantome
            this.clean();
            if (this.marker.collider.placeIf()) {
                this.marker.collider.return();
            };
            this.marker.sprite.inputEnabled=true;
        },
        clean:function () {
            // hard move callback reset
            this.marker.joueur.game.input.moveCallbacks=[];
            this.fantome.visible=false;
        },
    }

    return Landing
})
