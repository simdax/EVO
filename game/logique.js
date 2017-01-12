function check(dic,k) {
    var keys=Object.keys(dic);
    for(var i = 0; i<keys.length ; i++) {
        if((Object.keys(dic[keys[i]])).indexOf(k) >= 0){return true}
    };
    return false
};



var joueur = function () {
this.inventaire= {
    mollusques: {
        annelides:true,
        escargots:false
    },
    cephalopodes:{
        seches:false,
        pieuvres:false,
    },
    arthropodes:{
        insectes:false,
        arachnides:false,
    },
    selaciens:{
        roussettes:false,
        requins:false,
    },
    osteoichtyens:{
        thons:false,
        coelacanthes:false
    },
    anapasides:{
        grenouilles:false,
        serpents:false,
        crocodiles:false,
    },
    dinosauriens:{
        compsognathus:false,
        tyrannosaures:false
    },
    cetaces:{
        orques:false,
    },
    mammiferes:{
        rongeurs:false,
        hippopotames:false,
        gorilles:false,
    }
};    
    this.xps=0;
}

joueur.prototype={
    set:function (key,val) {
        var k=Object.keys(this.inventaire);
        for(var i = 0; i < k.length; i++) {
            if((Object.keys(this.inventaire[k[i]])).indexOf(key) >= 0){
                this.inventaire[k[i]][key] = val
            } // exists
        }
    },
    get:function (key) {
        var k=Object.keys(this.inventaire);
        for(var i = 0; i < k.length; i++) {
            if((Object.keys(this.inventaire[k[i]])).indexOf(key) >= 0){
                return this.inventaire[k[i]][key]
            } // exists
        }
        return -1; //error
    },
    checkPhylums:function () {
        var res=0;
        for(var p in this.inventaire) {
            if (Object.values(p).every(true)) {
                res+=1
            }
        };
        return res
    },
    gagnerXP:function () {
        this.xps = this.xps + 1 + this.checkPhylums()
    },
    acheter:function (espece) {
        switch(this.get(espece)){
        case -1:
        console.log("error");
        break;
        case true:
        console.log("tu l'as déjà !");
        break;
        default:
            if(phylum.xp < this.xps){
                this.xps -= espece.xp;
                this.set(espece, true)
            }{
                console.log("pas assez d'argent");
            };
        }
    }
}

// //trios en haut
// game.add.text(100,60,"2");
// game.add.text(230,60,"2");
// game.add.text(350,60,"2");

// // trois en bas
// game.add.text(100,470,"2");
// game.add.text(230,470,"2");
// game.add.text(400,420,"2");

// // trois au milieu
// game.add.text(100,270,"2");
// game.add.text(230,300,"2");
// game.add.text(350,200,"2");

var bebete=function (){ };
bebete.prototype={
    move:function () {
        
    },
    attaque:function (bebete) {
        bebete.meurt()
    },
    meurt:function () {
        this.sprite.destroy()
    },
}

var Espece={
    nb:2,
}


Especes= {
    mollusques: {
        annelides:{proies:[],xp:0,type:"marin"},
        escargots:{proies:[],xp:0,type:"terrestre"}
    },
    cephalopodes:{
        seches:{proies:["annelides"],xp:3,type:"marin"},
        pieuvres:{proies:["thons"],xp:3,type:"marin"}
    },
    arthropodes:{
        insectes:{proies:[],xp:1,type:"terrestre"},
        arachnides:{proies:["insectes"],xp:4,type:"terrestre"}
    },
    selaciens:{
        roussettes:{proies:["seches"],xp:3,type:"marin"},
        requins:{proies:["coelacanthes"],xp:3,type:"marin"}
    },
    osteoichtyens:{
        thons:{proies:["annelides"],xp:3,type:"marin"},
        coelacanthes:{proies:["thons"],xp:3,type:"marin"}
    },
    anapasides:{
        grenouilles:{proies:["insectes"],xp:3,type:"terrestre"},
        serpents:{proies:["rongeurs"],xp:3,type:"terrestre"},
        crocodiles:{proies:["serpents","compsognathus"],xp:4,type:"terrestre"}
    },
    dinosauriens:{
        compsognathus:{proies:["grenouilles"],xp:2,type:"terrestre"},
        tyrannosaures:{proies:["hippopotames","compsognathus","gorilles"],xp:7,type:"terrestre"}
    },
    cetaces:{
        orques:{proies:["pieuvres","requins"],xp:7,type:"marin"}
    },
    mammiferes:{
        rongeur:{proies:["escargots"],xp:3,type:"terrestre"},
        hippopotame:{proies:["crocodiles"],xp:3,type:"terrestre"},
        gorille:{proies:[],xp:2,type:"terrestre"}
    }
};


var esp=function (mere,proies,xp) {
    this.mere=mere;
    this.proies=proies;
};
esp.prototype=Object.create(Phaser.Sprite.prototype, {
    meurt:function () {
        this.destroy();
        mere.meurt()
    }
});

var phylum=function (name,available) {
    this.name=name; this.nb=2;
    this.available=available;
    this.sprites=[];
    for(var i = 0; i < 2; i++) {
        sprites.add(new esp(this))
    }
    
};
phylum.prototype={
    meurt:function () {
        this.nb-=1;
        //game.remove.sprite
    }
};

// image du jeu

interieur = function (game) {};
interieur.prototype={
    preload: function () {
        game.load.image("interieur","images/interieurIncubateur.jpg" )
    },
    create:function () {
        var img=game.add.image(0,0, "interieur")
        img.scale.setTo(1,0.85);
        game.add.text(30,0,"20");

        //trios en haut
        game.add.text(100,60,"2");
        game.add.text(230,60,"2");
        game.add.text(350,60,"2");

        
        // trois en bas
        game.add.text(100,470,"2");
        game.add.text(230,470,"2");
        game.add.text(400,420,"2");

        // trois au milieu
        game.add.text(100,270,"2");
        game.add.text(230,300,"2");
        game.add.text(350,200,"2");
        
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)
    },
    goTo:function () {
        game.state.start("board", true,false)
    }
};
