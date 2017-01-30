
var Pion=function (image,joueur) {

  //collider is already assigned

  this.collider=joueur.collider;
  this.collider.marker=this;
  this.groupe=joueur.groupe;
  this.joueur= joueur

this.landing=true;  //it means its not already on the board

  // prop
  this.image=image;
  this.pos=[];// x,y  [-1,-1];
  this.sprite;
  this.isTweened=false; // it makes the menu appears
  this.esp=Lang.getEvo(image)

  //init
  this.create()

};

Pion.prototype={

  // 4 fonctions de deplaces
  // 1. checkHex pour savoir où tu désignes sur le plateau
  // 2. place pour savoir si tu peux y aller
  // 3. check pour voir les regles de deplacement
  // 4. go pour y aller

  moveCallback:function(){

      //placeif follows the mouse
      this.fantome.collider.placeIf()

      // if right ==> cancel
      if (this.joueur.game.input.mouse.button===Phaser.Mouse.RIGHT_BUTTON) {
        this.clean()
      }
      // if left button ==> move marker
      else if (this.joueur.game.input.mouse.button===Phaser.Mouse.LEFT_BUTTON){
        // delete fantome
        this.clean();
        if (this.collider.placeIf()) {
          if (this.landing) {
            evo.socket.emit("new-marker-at",this);
            this.setId();
            // it means it appears on the board so its not a move,
            this.landing=false//but its no more landings
          }
        };
          evo.socket.emit("move-marker-at",this.id);
          Light.normal();
          this.joueur.game.input.moveCallbacks=[]
          setTimeout(function(){this.sprite.inputEnabled=true}.bind(this),500)
        };
  },
  createFantome:function () {
    if (this.fantome){ // this means : if you were placing a marker, and then you change, it change ghost
      this.fantome.meurt()
    };
    this.fantome=Fantome(this)
    //this.tween();
  },
  clean:function () {
    //this.tween()
    this.fantome.meurt();
    this.fantome=false;
    this.collider.marker=this;
  },


  // tween:function () {
  //   if(this.image=="vaisseau") {
  //     if (!this.tweened) {
  //       tweenBarreBas.haut.start()
  //       this.tweened=true
  //     }else{
  //       tweenBarreBas.bas.start()
  //       this.tweened=false
  //     }
  //   }
  // },

  create:function () {
    var sp=this.joueur.game.add.sprite(0,0,this.image);
    //var rond=draw()
    sp.tint= (this.joueur + 0.2) * 	0xCCCCCC
    sp.alpha=1;
    sp.anchor.setTo(0.5);
    sp.visible=false;

// marker properties

    sp.events.onInputDown.add(function () {
      this.land()
    },this)
    this.sprite=sp;

  },
  setId:function () {
      this.groupe.add(this.sprite);
      this.id=this.groupe.children.length;
  },
  meurt:function () {
    this.sprite.destroy();
    // dont reuse it
//    this.board.ids[this.id]=null;
    evo.socket.emit('delete-marker')

    // delete this ??
  }
};



// constructeurs...

var marker=function (image,joueur) {
  var res= new Pion(image,joueur);


  res.land=function (pos=this.pos) { // for first time it can be your main ship

      console.log(Lang.format("clicked at {1} de {2} ",this.image,this.joueur.id));
      Light.highlight(pos);
      this.sprite.inputEnabled=false;
      this.createFantome();
      this.joueur.game.input.addMoveCallback(this.moveCallback,this)
  };

  return res
};

var Fantome=function (m) {

  var res = new Pion(m.image,m.joueur)
  res.sprite.alpha=0.5;
  res.sprite.inputEnabled=false;

  res.meurt=function () {
    this.sprite.destroy();
    // without emit
  }
  return res
}
