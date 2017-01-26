
MDJ=function () {

  this.nbJoueurs=2;
  this.joueurs=[];
  this.currentJoueur=0
  this.mvts=4;

  for(var i = 0; i < this.nbJoueurs; i++) {
    this.joueurs.push(new Joueur(i))
  };

  // il indique le joueur
  this.txt=game.add.text(0,200, "joueur" + this.currentJoueur,
  {'font': '20px Arial',
  'fill': 'red'
}
);


// ce sont des fonctions pour le debut de partie, tranquillou
// on désactive tout
//menuGroup.setAll('inputEnabled',false)
hexagonGroup.setAll('alpha', 0.65)
var mC=function() {
  var p=this.current().vaisseau;
  p.placeIf()
};
var c=this.nbJoueurs;
var input=function () {
  c-=1;
  if (c>0) {
    this.currentJoueur+=1
  }else{
    // un peu harsh, mais je repère pas sa connerie de delete
    game.input.moveCallbacks=[]
    game.input.onDown.removeAll();
    for(var i = 0; i < this.joueurs.length; i++) {
      var pion=this.joueurs[i].vaisseau
      pion.sprite.inputEnabled=true
      ids.push(pion)

      //menuGroup.setAll('inputEnabled',true)
      hexagonGroup.setAll('alpha', 1)

      this.next() // et go !
    }
    this.next()
  }
};
game.input.addMoveCallback(mC,this);
game.input.onDown.add(input,this);
}

MDJ.prototype={

  /*  END OF TURN */
//  update => clean if pending operations
// endofturn => confirmation box
// next => main func
  // utilisé en interne avec l'argument str
  clean:function () {
    // s'il reste des opérations
    // "pendantes" et que c'est un endofturn
    normal();
    if(marker.fantome){ marker.fantome.meurt()}
    this.joueurs.forEach((joueur)=>{
      joueur.vaisseau.sprite.inputEnabled=true
    }) ;
  },
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
next:function () {
  this.currentJoueur =  (this.currentJoueur +1) % this.nbJoueurs;
  this.current().update();
  Timbres.synth.triggerAttackRelease("B5",0.2);
  console.log("au tour de "+this.currentJoueur);
  this.txt.setText("joueur" + this.currentJoueur);
},

/* select funcs */

current:function () {
  return this.joueurs[this.currentJoueur];
},
update:function () {
  if (this.mvts!=0) {
    this.mvts-=1;
  };
},
}
