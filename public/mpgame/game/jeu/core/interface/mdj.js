define(['joueur'],function(Joueur) {
    

    var MDJ=function (id,nb,game,groupes) {

        this.nbJoueurs=nb;

        // we need to keep track of who is playing
        this.currentJoueur=0;
        this.mvts=4;

        this.groupes=groupes;
        // collisions is for the markers
        this.toi= new Joueur(id,game,groupes);
        this.joueurs={};

        for (var i = 0; i < nb; i++) {
            if(i==id){this.joueurs[i]=this.toi}else{
                this.joueurs[i]=new Joueur(i,game,groupes)
            }
        }

        this.turns=0;

    }

    MDJ.prototype={

        /*  END OF TUrn */

        //  update => clean if pending operations
        // endofturn => confirmation box
        // next => main func


        // utilisé en interne avec l'argument str
        // s'il reste des opérations
        // "pendantes" et que c'est un endofturn

        clean:function () {
            this.groupes.light.normal();
            if(marker.fantome){ marker.fantome.meurt()}
            this.joueur.vaisseau.sprite.inputEnabled=true;
        },


        // BOX alert
        endofturn:function () {
            var str="finir votre tour ?";
            if (this.mvts>0) {str=str+"il reste encore"+this.mvts}
            if(confirm(str)){
                this.clean();
                // et on tourne
                this.next();
                this.mvts=4
            }
        },

        // end of others turns
        next: function () {
            this.currentJoueur =  (this.currentJoueur +1) % this.nbJoueurs;
            if(this.currentJoueur!=this.toi.id){
                this.groupes.input(false);
                this.groupes.hexagon.alpha=0.2;
            }
            else{
                this.groupes.input(true);
                this.groupes.hexagon.alpha=1;
            };
            console.log("au tour de "+this.currentJoueur);
        },


        /* select funcs */

        update:function () {
            if (this.mvts!=0) {
                this.mvts-=1;
            };
        },
    };

    return MDJ

})
