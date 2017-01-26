var marker=function (image,joueur) {
  // prop
  this.joueur= joueur
  this.image=image;
  this.pos=[-1,-1];
//  this.id;
  this.sprite;
  this.isTweened=false; // it will change only for vaisseau
  this.esp=getEvo(image)
  //init
  this.create()
};
marker.prototype={

  // 4 fonctions de deplaces
  // 1. checkHex pour savoir où tu désignes sur le plateau
  // 2. place pour savoir si tu peux y aller
  // 3. check pour voir les regeles de deplacement
  // 4. go pour y aller

  land:function () {
    highlight(this.pos)
    this.createFantome()
    game.input.addMoveCallback(function(){
      marker.fantome.placeIf()
      if (game.input.mouse.button===Phaser.Mouse.RIGHT_BUTTON) {
        this.clean()
      }
      else if (game.input.mouse.button===Phaser.Mouse.LEFT_BUTTON){
        if (this.placeIf()) {
          if (this.landing) {
            // it means it appears on the board so its not a move,
            this.landing=false//but its no more landings
          }else{mdj.update()}
          this.clean()
        };
      }
    },this)
  },
  createFantome:function () {
    if (marker.fantome){
      marker.fantome.meurt()
    };
    this.sprite.inputEnabled=false;
    marker.fantome=new marker(this.image, -1) // a joueur of -1
    marker.fantome.sprite.alpha=0.38;
    this.tween();
  },
  clean:function () {
    this.tween()
    game.input.moveCallbacks=[]
    normal();
    marker.fantome.meurt();
    this.sprite.inputEnabled=true
  },
  checkTerrain:function (x,y) {
    var terrain=  hexagonGroup.getAt(convert(x,y));
    var terrainOK;
    if (this.image == "vaisseau") {
        terrainOK=true // le vaisseau va partout
    }else{
      terrainOK= this.esp.type==terrain.key
    }
    return  terrainOK && (terrain.alpha != 1)
  },
  rencontre:function (autre,x,y) {
    if (this.image=="vaisseau") { // le vaisseau est totalement inoffensif
      return false
    }
    if (autre.image=="vaisseau") {
      if (autre.joueur==this.joueur) {
        mdj.current().rentrerBete()
        return true
      }
      return false
      // le vaisseau n'interagit pas avec les bêtes
      // il faudrait aller en-dessous et tout, mais compliqué...
    }
    else if (this.esp.proies.includes(autre.image)) {
      autre.meurt();
      this.go(autre.pos[0],autre.pos[1])
      return true
    }
    else {
      return false
    }
  },
  placeIf: function(){
    if(mdj.mvts == 0){return false}
    // the bool value is for does it should be considered as a move ?
    var pos=checkHex();
    var posX=pos[0]; var posY=pos[1];
    if (this.checkTerrain(posX,posY)) {
      for(var i = 0; i < ids.length; i++) {
        if (arraysEqual(ids[i].pos,[posX,posY])) {
          // sound
          return this.rencontre(ids[i])
        }
      };
      this.go(posX,posY); return true
    }
    return false
  },
  go:function (posX,posY) {
    if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
      this.sprite.visible=false;
    }
    else{
      this.sprite.visible=true;
      this.sprite.x = hexagonWidth/4*3*posX+hexagonWidth/2;
      this.sprite.y = hexagonHeight*posY;
      if(posX%2==0){
        this.sprite.y += hexagonHeight/2;
      }
      else{
        this.sprite.y += hexagonHeight;
      };
      this.pos=[posX,posY]
    };
  },
  tween:function () {
    if(this.image=="vaisseau") {
      if (!this.tweened) {
        tweenBarreBas.haut.start()
        this.tweened=true
      }else{
        tweenBarreBas.bas.start()
        this.tweened=false
      }
    }
  },
  create:function () {
    var sp; var img=this.image;
    sp=game.add.sprite(0,0,img);
    //var rond=draw()
    sp.tint= (this.joueur + 0.2) * 	0xCCCCCC
    sp.anchor.setTo(0.5);
    sp.visible=false;

// marker properties

    //events
    if (this.joueur==-1) {} // means fantome and do not trigger click
    else {sp.events.onInputDown.add(()=>{
        console.log(this.image+this.joueur);
              if (mdj.currentJoueur==this.joueur) {
                this.land()
              }
            },this)
    }
    betesGroup.add(sp);
    this.sprite=sp
  },
  meurt:function () {
    this.sprite.destroy();
    // delete this ??
  }
};
