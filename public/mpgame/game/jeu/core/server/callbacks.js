//                 _
//  _ __  __ _ _ _| |_____ _ _
// | '  \/ _` | '_| / / -_) '_|
// |_|_|_\__,_|_| |_\_\___|_|


define(["marker","lang"],function(marker,Lang){

    var dict={


//        player actions inventaire:{
        acheter:function(id,espece) {
            this.mdj.joueurs[id].acheter(espece)
        },


  //      init
        start: function() {

            console.log("on starte !!");

            var pion=this.mdj.toi.vaisseau=
                evo.network.newMarker(
                    "vaisseau",this.mdj.toi.id
                );
               // null here means "all the board is available for landing"
            pion.land(null);
            
            var callback=function() {

                if(pion.ok && this.mdj.currentJoueur == this.id ){
                    evo.network.changeTurn();
                    this.game.input.onDown.remove(callback,this)
                };
            };

            this.game.input.onDown.addOnce(callback,this);
            
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
                        if (this.mdj.currentJoueur==joueurID) {
                            console.log("deplacement !");
                            pion.land()
                        }
                        else{
                            console.log("rien");
//                            infos générales
                        }
                }.bind(this,pion,image,joueurID)
            );
            
            pion.setId();
            pion.landing=false;

            if (pos) {
                evo.network.moveMarker(pos)
            };
            return pion;
        },
        moveMarker:function (idJoueur,idbete,pos) {
            console.log("move de "+idJoueur+idbete+" a "+pos);
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
