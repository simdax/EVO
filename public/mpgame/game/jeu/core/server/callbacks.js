
define(["marker"],function(marker){

    var dict={


        // player actions inventaire:{
        acheter:function(id,espece) {
            this.mdj.joueurs[id].acheter(espece)
        },


        //init
        start: function() {

            console.log("on starte !!");
            // the first round is just a "one move" round
            var pion=this.mdj.toi.vaisseau;
            pion.land(null);
            
            var callback=function() {

                // null here means "all the board is available for landing"
                
                if(pion.ok && this.mdj.currentJoueur == this.id ){
                    console.log("NEXT ! ");
                    evo.network.changeTurn();
                    this.game.input.onDown.remove(callback,this)
                };
            };

            this.game.input.onDown.addOnce(callback,this);
            
        },


        // mdj
        changeTurn:function () {
            this.mdj.next()
        },


        // pion movements
        newMarker:function(image,joueur) {
            console.log("new");
            var pion=this.mdj.joueurs[joueur].newMarker(image)
            pion.setId();
        },
        deleteMarker:function (idJoueur,idbete) {
            this.mdj.joueurs[idJoueur].grp[idbete].meurt()
        },
        moveMarker:function (idJoueur,idbete,pos) {
            console.log("move");
            this.mdj.joueurs[idJoueur].grp[idbete].collider.go(pos[0],pos[1])
        },
        mange:function() {
            
        },
        rentre:function() {
            
        },

        //
       
    };

    return dict
})
