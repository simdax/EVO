function check(dic,k) {
    var keys=Object.keys(dic);
    for(var i = 0; i<keys.length ; i++) {
        if((Object.keys(dic[keys[i]])).indexOf(k) >= 0){return true}
    };
    return false
};

get=function (key,dict) {
        var k=Object.keys(dict);
        for(var i = 0; i < k.length; i++) {
            if((Object.keys(dict[k[i]])).indexOf(key) >= 0){
                return dict[k[i]][key]
            } // exists
        }
        return -1; //error
    }

function allKeys() {
    var res=[];
    for(var ph in Especes){
        res.push(Object.keys(Especes[ph]))
    }
    return res
}

var Joueur = function (id) {

    this.vaisseau=new marker("vaisseau",id)
    this.xps=10;
    // this.phylums=[];

    this.inventaire= {
        mollusques: {
            annelides:false,
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
}


Joueur.prototype={
    create:function (espece,id) {
        var m=new marker(espece,id)
        var nbRest=this.get(espece);
	console.log(nbRest);
        if (nbRest == 1 || nbRest == 2) {
            new marker(espece);
            this.set(espece)=nbRest-1
        }else{
            console.log("pas possible d'acheter");
        };
	return m
    },
    set:function (key,val) {
// TODO add color
        var k=Object.keys(this.inventaire);
        for(var i = 0; i < k.length; i++) {
            if((Object.keys(this.inventaire[k[i]])).indexOf(key) >= 0){
                this.inventaire[k[i]][key] = val
            }
        }
    },
    get:function (key) {
      var res=get(key,this.inventaire);
      if (res!=-1) {
        return res
      }else
      { console.log("error sur " +key)}
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
        var phylum=get(espece,Especes);
        switch(this.get(espece)){
        case -1:
            console.log("error");
            break;
        case false:
            if(phylum.xp < this.xps){
                this.xps -= espece.xp;
                this.set(espece, true)
            }{
                console.log("pas assez d'argent");
            };
            break;
        default:
            console.log("tu l'as déjà !");
            break;
        }
    }
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
        rongeurs:{proies:["escargots"],xp:3,type:"terrestre"},
        hippopotames:{proies:["crocodiles"],xp:3,type:"terrestre"},
        gorilles:{proies:[],xp:2,type:"terrestre"}
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
