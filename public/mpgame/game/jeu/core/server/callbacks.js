
//          _ _ _             _
//  __ __ _| | | |__  __ _ __| |__ ___
// / _/ _` | | | '_ \/ _` / _| / /(_-<
// \__\__,_|_|_|_.__/\__,_\__|_\_\/__/


define(["marker","lang"],function(marker,Lang){

    var dict={


        //        player actions inventaire:{
        acheter:function(espece) {
            return this.mdj.toi.acheter(espece)
        },
        poper:function(espece) {
            return this.mdj.toi.create(espece)
        },


        //      init
        start: function() {
            console.log("start !!");
            this.mdj.toi.vaisseau=evo.network.newMarker("vaisseau",this.mdj.toi.id)
        },

        land:function() {
            this.mdj.toi.vaisseau.land(null);
        },


        //    mdj
        changeTurn:function () {
            console.log("NEXT !");
            this.mdj.next()
        },


        //  pion movements
        newMarker:function(image,joueurID) {

            console.log("new "+image+joueurID);

            var pion=this.mdj.joueurs[joueurID].newMarker(image);
            pion.sprite.events.onInputDown.add(
                function(pion,image,joueurID) {
                    
                    if (evo.game.phaser.input.mousePointer.button==Phaser.Mouse.LEFT_BUTTON) {
                        
                        console.log(Lang.format("clicked at {1} de {2}",image,joueurID));
                        if (this.mdj.currentJoueur==joueurID
                            && this.mdj.currentJoueur == this.id
                           ) {
                            console.log("deplacement !");
                            pion.land()
                        }
                        else{
                            console.log("rien");
                        }
                    }
                }.bind(this,pion,image,joueurID)
            );
            
            pion.setId();
            return pion;
        },
        moveMarker:function (idJoueur,idbete,pos) {
            console.log("move de "+idJoueur+" "+idbete+" à "+pos);
            this.mdj.joueurs[idJoueur].grp[idbete].collider.go(pos[0],pos[1])
        },
        deleteMarker:function (idJoueur,idbete) {
            console.log("mort de "+idJoueur+idbete);
            this.mdj.joueurs[idJoueur].grp[idbete].meurt()
        },
        mange:function() {
            
        },
        rentre:function() {
            
        },

        
        
    };

    return dict
})
