
var Joueur = function (id) {

  this.id=id;
  this.vaisseau=new marker("vaisseau",this.id)
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
  update:function (){
        var i=this.inventaire;
        // colorize menus buttons
        for(var phyl in i){ for (var esp in i[phyl]){
          if(this.get(esp)!=false){
            couleursBouttons[esp].tint=0x410055
          }else{
            couleursBouttons[esp].tint=0x000000
          }
        }};
        this.gagnerXP()
      },
  create:function (espece) {
     var nbRest=this.get(espece);
     console.log(nbRest);
     if (nbRest == 1 || nbRest == 2) {
       var m=new marker(espece,this.id)
       this.set(espece, nbRest-1)
       return m
     }else{
       console.log("pas possible d'acheter");
       return -1
     };
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
      var vals=[];
      for(var q in this.inventaire[p]){
        vals.push(this.inventaire[p][q])
      };
      if (vals.every(function (el,i,ar){el>0})) {
        res+=1
      };
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
            this.xps -= phylum.xp;
            this.set(espece, 2)
            couleursBouttons[espece].tint=0x410055
          }else{
            console.log("pas assez d'argent");
          };
          break;
          default:
          console.log("tu as déjà : "+ espece);
          // game.time.events.add(2000, function() {
          //   myText= "tu as déjà : "+ espece;
          //   game.debug.text(myText,100,100);
          //   game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
          //   game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);},
          //                      this);
          break;
        }
  },
    rentrerBete:function (bete) {
        console.log("rentrage de bete");
        this.set(bete) = this.get(bete) + 1
    }
}


Especes= {
  mollusques: {
    annelides:{ancetre:null,proies:[],xp:1,type:"marin"},
    escargots:{ancetre:"annelides",proies:[],xp:2,type:"terrestre"}
  },
  cephalopodes:{
    seches:{ancetre:"annelides",proies:["annelides"],xp:3,type:"marin"},
    pieuvres:{ancetre:"seches",proies:["thons"],xp:3,type:"marin"}
  },
  arthropodes:{
    insectes:{ancetre:"annelides",proies:[],xp:1,type:"terrestre"},
    arachnides:{ancetre:"insectes",proies:["insectes"],xp:4,type:"terrestre"}
  },
  selaciens:{
    roussettes:{ancetre:"thons",proies:["seches"],xp:3,type:"marin"},
    requins:{ancetre:"roussettes",proies:["coelacanthes"],xp:3,type:"marin"}
  },
  osteoichtyens:{
    thons:{ancetre:null,proies:["annelides"],xp:3,type:"marin"},
    coelacanthes:{ancetre:"thons",proies:["thons"],xp:3,type:"marin"}
  },
  anapasides:{
    grenouilles:{ancetre:"coelacanthes",proies:["insectes"],xp:3,type:"terrestre"},
    serpents:{ancetre:"grenouilles",proies:["rongeurs"],xp:3,type:"terrestre"},
    crocodiles:{ancetre:"grenouilles",proies:["serpents","compsognathus"],xp:4,type:"terrestre"}
  },
  dinosauriens:{
    compsognathus:{ancetre:"grenouilles",proies:["grenouilles"],xp:2,type:"terrestre"},
    tyrannosaures:{ancetre:"compsognathus",proies:["hippopotames","compsognathus","gorilles"],xp:7,type:"terrestre"}
  },
  cetaces:{
    orques:{ancetre:"rongeurs",proies:["pieuvres","requins"],xp:7,type:"marin"}
  },
  mammiferes:{
    rongeurs:{ancetre:"grenouilles",proies:["escargots"],xp:3,type:"terrestre"},
    hippopotames:{ancetre:"rongeurs",proies:["crocodiles"],xp:3,type:"terrestre"},
    gorilles:{ancetre:"rongeurs",proies:[],xp:2,type:"terrestre"}
  }
};



