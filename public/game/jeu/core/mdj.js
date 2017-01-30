
var MDJ=function (id,groupes,nb,game) {

  this.nbJoueurs=nb;

  // we need to keep track of who is playing
  this.currentJoueur=0;
  this.mvts=4;

  // collisions is for the markers
  this.collisions=new Collisions(game,groupes.betes,groupes.hexagon)
  this.joueur= new Joueur(id,groupes.toi,this.collisions,game);
}

MDJ.prototype={

  /*  END OF TURN */

  //  update => clean if pending operations
  // endofturn => confirmation box
  // next => main func


  // utilisé en interne avec l'argument str
  // s'il reste des opérations
  // "pendantes" et que c'est un endofturn

  clean:function () {
    Light.normal();
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


// MDJ current joueur +1
  next:function () {
    this.currentJoueur =  (this.currentJoueur +1) % this.nbJoueurs;
    // this.current().update();
    Timbres.synth.triggerAttackRelease("B5",0.2);
    console.log(this.currentJoueur);
    console.log("au tour de "+this.currentJoueur);
    // if(this.currentJoueur==evo.id+1){groupes.betes.inputEnabled=false;}
    // if(this.currentJoueur==evo.id){groupes.betes.inputEnabled=true;}
    //this.txt.setText("joueur" + this.currentJoueur);
    evo.socket.emit('turn-player',evo.socket.id)
  },
  // meeeeega loooose
  // without emit...
  nextAlone: function () {
    this.currentJoueur =  (this.currentJoueur +1) % this.nbJoueurs;
    this.current().update();
    Timbres.synth.triggerAttackRelease("B5",0.2);
    console.log("au tour de "+this.currentJoueur);
    this.txt.setText("joueur" + this.currentJoueur);
},



  /* select funcs */

  update:function () {
    if (this.mvts!=0) {
      this.mvts-=1;
    };
  },
}
