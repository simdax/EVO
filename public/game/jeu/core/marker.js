
var Pion=function (image,joueur) {

  //collider is already assigned

  this.joueur= joueur
  this.collider= new Collisions(joueur.groupes.betes,joueur.groupes.hexagon,this)

this.landing=true;  //it means its not already on the board

  // prop
  this.image=image;
  this.pos=[];// x,y  [-1,-1];
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

       var pos=this.fantome.collider.math.checkHex();
      if(this.fantome.collider.placeIf()){
        this.fantome.collider.go(pos[0],pos[1])
      };
      if (this.joueur.game.input.mouse.button===Phaser.Mouse.RIGHT_BUTTON) {
        this.clean()
      }
      // if left button ==> move marker
      else if (this.joueur.game.input.mouse.button===Phaser.Mouse.LEFT_BUTTON){
        // delete fantome
        if (this.collider.isOut()){}//rien
        else{
        this.joueur.game.input.moveCallbacks=[];
        this.clean();
        if (this.collider.placeIf()) {
          this.collider.return.call();
          if (this.landing) {
            evo.socket.emit("place-marker-at",
          [this.image,this.joueur.id,this.pos]);
//            {image:this.image,joueur:this.joueur,pos:this.pos});
            this.setId();
            // it means it appears on the board so its not a move,
            this.landing=false//but its no more landings
          }else{
            evo.socket.emit("move-marker-at",
            [this.joueur.id,this.id,this.pos]);
          };
        };
          Light.normal();
          setTimeout(function(){
            this.sprite.inputEnabled=true}.bind(this),300)
          }
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
    sp.inputEnabled=true;

// marker properties

    sp.events.onInputDown.add(function () {
      this.land()
    },this)
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

  var res = new Pion(m.image,m.joueur);
  res.sprite.alpha=0.5;
  res.sprite.inputEnabled=false;
  // res.collider.always=true;
  return res
}
