
define(["marker"],function(marker){

    var dict={
        //inventaire:{
        acheter:function(id,espece) {
            this.mdj.joueurs[id].acheter(espece)
        },
        //init
        start: function() {
            // init player ship
            var pion = this.mdj.toi.vaisseau = marker("vaisseau",this.mdj.toi);

            // null here means "all the board is available for landing"
            this.mdj.toi.vaisseau.land(null);

            // the first round is just a "one move" round
            var callback=function() {
                if(pion.ok){
                    console.log("NEXT ! ");
                    this.mdj.next();
                    this.game.input.onDown.remove(callback,this)
                }
            };
            this.game.input.onDown.addOnce(callback,this);
        },
        //mouvement    board:{
        changeTurn:function () {
            this.mdj.nextAlone()
        },
        deleteMarker:function (idJoueur,idbete) {
            this.mdj.joueurs[idJoueur].grp[idbete].meurt()
        },
        moveMarker:function (idJoueur,idbete,pos) {
            this.mdj.joueurs[idJoueur].grp[idbete].collider.go(pos[0],pos[1])
        },
        newMarkerAt:function(image,joueur,pos) {
            console.log(arguments);
            var pion=this.mdj.joueurs[joueur].newMarker(image)
            pion.collider.go(pos[0],pos[1]);
            pion.setId();
            return pion
        }

    }

    return dict
})
