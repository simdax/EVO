

// constructeurs...

// pion subclass

define(["pion","landing","lang"],function(Pion,Landing,Lang) {
    
    var marker=function (image,joueur) {
        var res= new Pion(image,joueur);

        res.landingObject=new Landing(res);
        res.land=function (pos=this.pos) { // for first time it can be your main ship
            
            this.joueur.groupes.light.highlight(pos);
            this.landingObject.fantome.visible=true;
            this.sprite.inputEnabled=false;
            this.joueur.game.input.addMoveCallback(this.landingObject.moveCallback,this.landingObject);

            var callbackLeft=function() {
                console.log("left");
                if(this.marker.ok){
                    this.mouseCallback();
                    this.marker.joueur.game.input.mousePointer.leftButton.onDown.remove(callbackLeft,this);
                    this.clean();
                }// else ça continue à vouloir lander
            };
            var callbackRight=function() {
                this.marker.joueur.game.input.mousePointer.rightButton.onDown.remove(callbackRight,this);
                this.clean();
            };


            this.joueur.game.input.mousePointer.rightButton.onDown.add(callbackRight,this.landingObject);
            this.joueur.game.input.mousePointer.leftButton.onDown.add(callbackLeft,this.landingObject);
        };

        return res
    };

    return marker
})
