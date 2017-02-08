//  _              _ _
// | |__ _ _ _  __| (_)_ _  __ _
// | / _` | ' \/ _` | | ' \/ _` |
// |_\__,_|_||_\__,_|_|_||_\__, |
//                         |___/


define(['pion'], function(Pion) {
    

    Landing= function(marker){

        this.marker=marker;

        //we create fantome
        var res = new Pion(marker.image,marker.joueur);
        res.sprite.alpha=0.5;
        res.collider.always=true;
        this.fantome=res;
        console.log(this.marker.sprite.inputEnabled);
    };

    Landing.prototype={
        
        moveCallback:function(){
            // fantome
            if(this.fantome.collider.placeIf()){
                this.marker.ok=true;
            }else{this.marker.ok=false};
        },
        mouseCallback:function() {
            // delete fantome
            if (this.marker.collider.placeIf()) {
                this.marker.collider.return();
            };
        },
        clean:function () {
            console.log("on clean");
            // hard moveCallbacks reset
            this.marker.joueur.game.input.moveCallbacks=[];
            this.marker.joueur.groupes.light.normal();
            this.fantome.sprite.visible=false;
            this.marker.joueur.groupes.input(true);
        },
    }

    return Landing
})
