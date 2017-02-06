

// constructeurs...
define(["pion","landing","lang"],function(Pion,Landing,Lang) {
    
    var marker=function (image,joueur) {
        var res= new Pion(image,joueur);

        res.landingObject=new Landing(res);
        res.land=function (pos=this.pos) { // for first time it can be your main ship


            
            this.joueur.groupes.light.highlight(pos);
            this.landingObject.fantome.visible=true;
            this.sprite.inputEnabled=false;
            this.joueur.game.input.addMoveCallback(this.landingObject.moveCallback,this.landingObject);
            //        this.joueur.game.input.activePointer.onDown.add(this.onRightDown, this)
            var callback=function() {
                if(this.marker.ok){
                    this.mouseCallback();
                    this.marker.joueur.groupes.light.normal();
                    this.marker.joueur.game.input.onDown.remove(callback,this)
                }// else ça continue à vouloir lander
            };
            this.joueur.game.input.onDown.add(callback,this.landingObject);
        };

        return res
    };

    return marker
})
