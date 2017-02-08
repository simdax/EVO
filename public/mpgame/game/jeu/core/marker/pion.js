define(["collisions","lang"],function(Collisions,Lang) {
    
    var Pion=function (image,joueur) {

        //collider is already assigned

        this.joueur= joueur
        this.collider= new Collisions(joueur.groupes.betes,joueur.groupes.hexagon,this)

        this.landing=true;  //it means its not already on the board

        // prop
        this.esp=Lang.getEvo(image);
        this.image=image;
        this.pos=[];// x,y  [-1,-1];
        this.isTweened=false; // it makes the menu appears


        //init
        this.create()

    };

    Pion.prototype={

        create:function () {
            var sp=this.joueur.game.add.sprite(0,0,this.image);
            //var rond=draw()
            sp.tint= (this.joueur + 0.2) * 0xCCCCCC
            sp.anchor.setTo(0.5);
            sp.visible=false;
            sp.inputEnabled=true;

            // marker properties

            // sp.events.onInputDown.add(function () {
            //     if (this.joueur.id==this.mdj.) {
            //         this.land()
            //     }
            // },this)
            this.sprite=sp;

        },

        setId:function () {
            this.id=this.joueur.grp.length;
            this.joueur.groupe.add(this.sprite);
            this.joueur.grp.push(this);
        },

        meurt:function () {
            this.joueur.grp[this.id]=null;
            this.sprite.destroy();

            delete this;
            // dont reuse it
            //    this.board.ids[this.id]=null;
            evo.socket.emit('delete-marker')

            // delete this ??
        }
    };

    return Pion
    
})
