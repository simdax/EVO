var Groupes=function (game,otherPlayers){

  // these are layers
  // i don't understand everything with their organisation...

this.hexagon=game.add.group();

this.toi=game.add.group();

this.others=game.add.group();
for (var i = 0; i < otherPlayers; i++) {
    this.others.add(game.add.group())
};

// this.ipad=game.add.group();
// this.regle=game.add.group();
// this.menu=game.add.group();
// this.grosseBarre=game.add.group()

this.betes=game.add.group();

this.betes.add(this.toi);
this.betes.add(this.others);
// this.hexagon.add(this.betes);

// this.menu.fixedToCamera = true;
// this.menu.add(this.grosseBarre)

};

var Map=function () {

this.hexagonWidth = 80;
this.hexagonHeight = 70;
this.sectorWidth = this.hexagonWidth / 4 * 3;
this.sectorHeight = this.hexagonHeight;
this.gradient = (this.hexagonWidth / 4) / (this.hexagonHeight / 2);

this.gridSizeX = 20;
this.gridSizeY = 20;
this.columns = [
  Math.ceil(this.gridSizeY / 2),
  Math.floor(this.gridSizeY / 2)
];

this.calcBounds=function () {

  return[1300,1500]

    return [
      this.gridSizeX * this.gridSizeY / 2,
      (this.hexagonWidth * 9 / 8) * (this.hexagonHeight * 10 / 8)
    ]
}

};


// we need to set tools and hexagons
Light= {

highlight:function(point) {
  if (!point) {
    Light.hexagons.setAll('alpha', 0.5);
  }else{
    var indices=Light.tools.autour(point)[0]
    Light.hexagons.setAll('alpha', 1);
    for(var i = 0; i < indices.length; i++) {
        Light.hexagons.getAt(indices[i]).alpha=0.5;
    }
  }
},
normal:function () {
    Light.hexagons.setAll('alpha', 1)
}

};

var Board  = function(game,seed,id,nb) {
    this.game=game;
    this.seed=seed;
    this.id=id;
    this.nbJoueurs=nb;
    this.mapSettings =new Map;
}

Board.prototype = {
  preload: function() {

    // rien ...
   this.game.load.image("b", "images/sprites/boutonAbsurde.png");


    // AUDIO _________________
   this.game.load.audio('bip', "sound/mp3/button.mp3");
    // BOARD _________________
    // terrain
   this.game.load.image("hexMer", "images/hexMer.png");
   this.game.load.image("hexTerre", "images/hexTerre.png");
   this.game.load.image("hexagon", "images/hexagon.png");
    // dessins regles
   this.game.load.image("reglesEvo", "images/sprites/resize/reglesEVO.png");
   this.game.load.image("reglesManger", "images/sprites/resize/reglesMANGER.png");
    // icones regles
   this.game.load.image("iconeManger", "images/sprites/resize/ICONEmanger.png");
   this.game.load.image("iconeEvo", "images/sprites/resize/ICONEARBREEVOLUTION.png");
    // l'ipad en-dessous
   this.game.load.image("ipad", "images/sprites/resize/ipad.png")
      //button
   this.game.load.spritesheet('button', 'images/buttons/flixel-button.png', 77, 18);
    //SPRITES __________________
   this.game.load.image("vaisseau", "images/sprites/resize/vaisseau.png");
    var path = 'images/sprites/resize/';
    for (var phyl in Especes) {
      for (var espece in Especes[phyl]) {
       this.game.load.image(espece, path + espece + ".png")
      }
    };
  },
  create: function() {

  this.groupes=new Groupes(this.game,this.nb-1);
  this.gen=new Gen(this.game,this.seed,this.mapSettings,this.groupes);
  Light.hexagons=this.groupes.hexagon;
  Light.tools=new HexagonTools(this.game,this.mapSettings);

    //camera
    //  Modify the world and camera bounds
    var size = this.mapSettings.calcBounds();
   this.game.world.resize(size[0], size[1] + 150); // un petit pitchouille de plus ça fait pas de mal
    // en 20x20 =>this.game.world.resize(1800,900);
   this.game.stage.backgroundColor = "#000000";

    this.gen.createHexs(this.seed,this.mapSettings);
    // this.menu.createMenu();
    // this.menu.createBarres();

    // LOGIC
    // zoomKey =this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    // dezoomKey =this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.EOTkey =this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.cursors =this.game.input.keyboard.createCursorKeys();

    this.mdj=new MDJ(this.id,this.groupes,this.nbJoueurs,this.game);

  },

  update: function() {

    // startZoom(zoomKey,dezoomKey)
    // updateZoom()
    if (this.EOTkey.isDown) {
      this.mdj.endofturn()
    }

    if (this.cursors.left.isDown) {
     this.game.camera.x -= 4;
    } else if (this.cursors.right.isDown) {
     this.game.camera.x += 4;
    } else if (this.cursors.up.isDown) {
     this.game.camera.y -= 4;
    } else if (this.cursors.down.isDown) {
     this.game.camera.y += 4;
    }

  },

  render: function() {

    if (this.mdj) {

      // // todo, infos plus belles
     this.game.debug.text(console.txt, 0, 100);
     this.game.debug.text("mvts:" + this.mdj.mvts, 0, 300);

    }
  },

  //  private
  goTo: function() {
   this.game.state.start("interieur")
  },

}
