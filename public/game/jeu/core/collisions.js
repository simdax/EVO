var Collisions = function (game,betes,hexGroup,joueur,marker) {

  this.betes=betes;
  this.hexagons=hexGroup;

  this.joueur=joueur;
  this.marker=marker;

  this.math=new HexagonTools(game,new Map)
};

Collisions.prototype={

  isYours:function () {
      return board.groupes.toi.children.indexOf(this.marker) > -1
  },

  placeIf: function(){
    // the bool value is for does it should be considered as a move ?
    var pos=this.math.checkHex();
    var posX=pos[0]; var posY=pos[1];
    if (this.checkTerrain(posX,posY)) {
      var ids=this.betes.children;
      for(var i = 0; i < ids.length; i++) {
        if (Lang.arraysEqual(ids[i].pos,[posX,posY])) {
          // sound
          return this.rencontre(ids[i])
        }
      };
      this.go(posX,posY);
      return true
    }
    return false
  },
  go:function (posX,posY) {
    if(posX<0 || posY<0 || posX>=this.math.map.gridSizeX || posY>this.math.map.columns[posX%2]-1){
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


  rencontre:function (autre,x,y) {
    if (this.marker.image=="vaisseau") { // le vaisseau est totalement inoffensif
      return false
    }
    if (autre.image=="vaisseau") {
      if (autre.joueur==this.joueur) {
        this.joueur.rentrerBete()
        return true
      }
      return false
      // le vaisseau n'interagit pas avec les bêtes
      // il faudrait aller en-dessous et tout, mais compliqué...
    }
    else if (this.marker.esp.proies.includes(autre.image)) {
      autre.meurt();
      this.go(autre.pos[0],autre.pos[1])
      return true
    }
    else {
      return false
    }
  },

}
