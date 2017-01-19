
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
    hexagonGroup.setAll('alpha', 0.9)
    var mC=function() {
        var p=this.current().vaisseau;
    	  p.place()
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
    next:function () {
        this.current().update();
        this.currentJoueur =  (this.currentJoueur +1) % this.nbJoueurs;
        synth.triggerAttackRelease("B5");
        console.log("au tour de "+this.currentJoueur);
        this.txt.setText("joueur" + this.currentJoueur);
    },
    current:function () {
        return this.joueurs[this.currentJoueur];
    },
    update:function () {
        this.mvts-=1;
        if (this.mvts==0) {
            mdj.next();
            this.mvts=4
        };
    },
}
