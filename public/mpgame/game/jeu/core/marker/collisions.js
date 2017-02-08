// checkTerrain
// check rencontre
// go dans une case hexagonale

/// + tout ça dans un main placeIF


define(["math","map","lang"],function(HexagonTools,Map,Lang) {
    
    var Collisions = function (betes,hexGroup,marker) {

        this.betes=betes;
        this.hexagons=hexGroup;
        this.marker=marker;

        // INCOMPLETE
        //  you have to populate it with a player and at least a marker

        this.math=new HexagonTools(this.marker.joueur.game,new Map)
        this.always=false; // for ghost = true
    };

    Collisions.prototype={

        actions:{
            go:function(posX,posY) {
                return function() {
                    evo.network.moveMarker(
                        this.marker.joueur.id,
                        this.marker.id,
                        [posX,posY]);
                };
            },
            mange:function(pos,joueurID,beteID) {
                return function () {
                    evo.network.deleteMarker(beteID,joueurID)
                    evo.network.moveMarker(
                        this.marker.joueur.id,
                        this.marker.id,
                        pos);
                }
            },
            rentre:function() {
                return function () {
                    evo.network.deleteMarker(
                        this.marker.id,this.marker.meurt()
                    );
                    this.marker.joueur.rentrerBete();
                }
            }
        },
        here:function() {
            return this.math.checkHex()
        },
        isOut:function (pos=this.here()) {
            var posX=pos[0]; var posY=pos[1];
            return (posX<0 || posY<0 || posX>=this.math.map.gridSizeX || posY>this.math.map.columns[posX%2]-1)
        },
        placeIf: function(){

            var pos=this.here();
            if(this.isOut(pos)){}
            else{
                var posX=pos[0]; var posY=pos[1];
                
                if (this.checkTerrain(posX,posY)) {
                    //    console.log("terrain OK");

                    // this is for ghost.
                    // its a insider function
                    if(this.always){
                        this.go(posX,posY)
                        return true;
                    };

                    for (var i = 0; i < this.betes.children.length; i++) {
                        for (var j = 0; j < this.betes.children[i].length; j++) {
                            
                            var sp = this.betes.children[i].children[j];
                            if (Lang.arraysEqual(
                                this.math.checkHex(sp.x,sp.y),[posX,posY])){
                                // sound
                                //console.log("ya une bete");
                                var res= this.rencontre(i,sp.key,sp,posX,posY)
                                if(res){
                                    this.return=res;return true
                                }else{
                                    return false;
                                }
                            }else{}
                        }
                    }
                    // si aucun retour alors
                    this.return =
                        this.actions.go(posX,posY).bind(this)
                    return true;
                }
                else{
                    this.hex=null
                    return false;
                }
            }
        },
        go:function (posX,posY) {
            if(this.isOut([posX,posY])){
                this.marker.sprite.visible=false;
            }
            else{
                this.marker.sprite.visible=true;
                this.marker.sprite.x = this.math.map.hexagonWidth/4*3*posX+this.math.map.hexagonWidth/2;
                this.marker.sprite.y = this.math.map.hexagonHeight*posY;
                if(posX%2==0){
                    this.marker.sprite.y += this.math.map.hexagonHeight/2;
                }
                else{
                    this.marker.sprite.y += this.math.map.hexagonHeight;
                };
                this.marker.pos=[posX,posY]
            };
        },
        checkTerrain:function (x,y) {
            var terrain= this.hexagons.getAt(this.math.convert(x,y));
            var terrainOK;
            if (this.marker.image == "vaisseau") {
                terrainOK=true // le vaisseau va partout
            }else{
                terrainOK= this.marker.esp.type==terrain.key
            }
            return  terrainOK && (terrain.alpha != 1)
        },

        findIdForSpAndPlayer:function(sp,playerID) {
            var gp=this.marker.joueur.groupes.allMarkers[playerID];
            for(var i = 0; i < gp.length; i++) {
                if(sp===gp[i].sprite)
                    return i
            }
            // if we are here, its an error
            console.log("problème !!!");
            console.log(gp);
            console.log(sp);
            console.log(playerID);
        },
        rencontre:function (autreJoueur,autreImage,autreSprite,posX,posY) {
            if(this.marker.image=="vaisseau"){return false}
            else if (autreImage=="vaisseau" && autreJoueur==this.marker.joueur)
            {
                return this.actions.rentre().bind(this)
            }
            else if (this.marker.esp.proies.includes(autreImage)) {
                return this.actions.mange([posX,posY],autreJoueur,
                                          this.findIdForSpAndPlayer(autreSprite,autreJoueur)
                                         ).bind(this)
            }
            else {
                return false
            }
        },

    }

    return Collisions
})
