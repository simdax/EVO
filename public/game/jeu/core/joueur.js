
var Joueur = function (id,game,groupes) {

  this.id=id;
  this.groupe=game.add.group();
  groupes.betes.add(this.groupe)

  this.grp=[];

  this.game=game;
  this.groupes=groupes;

  this.xps=10;

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

  // a chaque tour on update le menu
  // + on rend les input aux pieces
  update:function (){
    this.gagnerXP()
  },
  hasParent:function (espece) {
    var bete=Lang.getEvo(espece);
    if (bete.ancetre==null) {
      return true // you can always create this kind of bete
    }else
    { if (this.get(bete.ancetre)) {
      return true
    }else{
      console.log("tu dois créer son ancetre avant, cad : "+ bete.ancetre);
      return false
    }
  }
},
newMarker:function (espece) {
  return marker(espece,this)
},
create:function (espece) {
  var nbRest=this.get(espece);
  console.log("il reste :" +nbRest);
  if (nbRest == 1 || nbRest == 2) {
    var m=this.newMarker();
    this.set(espece, nbRest-1)
    return m
  }else{
    console.log("il ne t'en reste plus");
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
  var res=Lang.get(key,this.inventaire);
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
assezdargent:function (phylum) {
  if(phylum.xp <= this.xps){return true}else{
    console.log("pas assez d'argent"); return false
  }
},
acheter:function (espece) {
  var phylum=Lang.get(espece,Especes);
  switch(this.get(espece)){
    case -1:
    console.log("error");
    break;
    case false:
    if(this.hasParent(espece) && this.assezdargent(phylum) ){
      this.xps -= phylum.xp;
      this.set(espece, 2)
    //  couleursBouttons[espece].tint=0x410055
      console.log("acheté : "+ espece);
    }else{
      // rien
    };
    break;
    default:
    console.log("tu as déjà un(e): "+ espece);
    break;
  }
},
rentrerBete:function (bete) {
  console.log("rentrage de bete");
  this.set(bete.esp, this.get(bete.image) + 1)
  bete.landing=true; bete.sprite.inputEnabled=false;
  bete.sprite.visible=false;
}
}


Especes= {
  mollusques: {
    annelides:{ancetre:null,proies:[],xp:1,type:"hexMer"},
    escargots:{ancetre:"annelides",proies:[],xp:2,type:"hexTerre"}
  },
  cephalopodes:{
    seches:{ancetre:"annelides",proies:["annelides"],xp:3,type:"hexMer"},
    pieuvres:{ancetre:"seches",proies:["thons"],xp:3,type:"hexMer"}
  },
  arthropodes:{
    insectes:{ancetre:"annelides",proies:[],xp:1,type:"hexTerre"},
    arachnides:{ancetre:"insectes",proies:["insectes"],xp:4,type:"hexTerre"}
  },
  selaciens:{
    roussettes:{ancetre:"thons",proies:["seches"],xp:3,type:"hexMer"},
    requins:{ancetre:"roussettes",proies:["coelacanthes"],xp:3,type:"hexMer"}
  },
  osteoichtyens:{
    thons:{ancetre:null,proies:["annelides"],xp:3,type:"hexMer"},
    coelacanthes:{ancetre:"thons",proies:["thons"],xp:3,type:"hexMer"}
  },
  anapasides:{
    grenouilles:{ancetre:"coelacanthes",proies:["insectes"],xp:3,type:"hexTerre"},
    serpents:{ancetre:"grenouilles",proies:["rongeurs"],xp:3,type:"hexTerre"},
    crocodiles:{ancetre:"grenouilles",proies:["serpents","compsognathus"],xp:4,type:"hexTerre"}
  },
  dinosauriens:{
    compsognathus:{ancetre:"grenouilles",proies:["grenouilles"],xp:2,type:"hexTerre"},
    tyrannosaures:{ancetre:"compsognathus",proies:["hippopotames","compsognathus","gorilles"],xp:7,type:"hexTerre"}
  },
  cetaces:{
    orques:{ancetre:"rongeurs",proies:["pieuvres","requins"],xp:7,type:"hexMer"}
  },
  mammiferes:{
    rongeurs:{ancetre:"grenouilles",proies:["escargots"],xp:3,type:"hexTerre"},
    hippopotames:{ancetre:"rongeurs",proies:["crocodiles"],xp:3,type:"hexTerre"},
    gorilles:{ancetre:"rongeurs",proies:[],xp:2,type:"hexTerre"}
  }
};
