
//          _ _ _             _
//  __ __ _| | | |__  __ _ __| |__ ___
// / _/ _` | | | '_ \/ _` / _| / /(_-<
// \__\__,_|_|_|_.__/\__,_\__|_\_\/__/


define(["marker","lang"],function(marker,Lang){

    var dict={


        //        player actions inventaire:{
        acheter:function(espece) {
            this.mdj.toi.acheter(espece)
        },
        poper:function(espece) {
            this.mdj.toi.create(espece)
        },


        //      init
        start: function() {

            console.log("start !!");

            // on créée des vaisseaux pour tous les joueurs
            for(var k in this.mdj.joueurs) {
                
                var joueur=this.mdj.joueurs[k];
                // here we bypass the send effect
                // using the good callback method
                joueur.vaisseau=
                    evo.network.dict
                    .newMarker.call(this,"vaisseau",joueur.id);
            };
            
        },

        land:function(id) {
            // on lande le sien
            var pion=this.mdj.toi.vaisseau;
            // null here means "the entire board is available for landing"
            pion.land(null);
        },


        //    mdj
        changeTurn:function () {
            console.log("NEXT !");
            this.mdj.next()
        },


        //  pion movements
        newMarker:function(image,joueurID,pos) {

            console.log("new "+image+joueurID);

            var pion=this.mdj.joueurs[joueurID].newMarker(image)
            pion.sprite.events.onInputDown.add(
                function(pion,image,joueurID) {
                    console.log(Lang.format("clicked at {1} de {2} ",image,joueurID));
                    if (this.mdj.currentJoueur==joueurID
                        && this.mdj.currentJoueur == this.id
                       ) {
                        console.log("deplacement !");
                        pion.land()
                    }
                    else{
                        console.log("rien");
                    }
                }.bind(this,pion,image,joueurID)
            );
            
            pion.setId();
            //            pion.landing=false;   

            if (pos) {
                pion.collider.go(pos[0],pos[1])
//                evo.network.moveMarker(this.mdj.toi.id,pion.id,pos)
            };
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
