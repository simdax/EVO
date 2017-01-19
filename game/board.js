var hexagonWidth = 80;
var hexagonHeight = 70;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var gradient = (hexagonWidth/4)/(hexagonHeight/2);

var gridSizeX = 20;
var gridSizeY = 20;
var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];

//var menuGroup;
var hexagonGroup;
var betesGroup;

var ids=[];
stack=[]






boardState= function (game) {};

boardState.prototype={


    preload:function () {

        // AUDIO _________________
        game.load.audio('bip', "sound/mp3/button.mp3");
        // BOARD _________________
        // terrain
	game.load.image("hexMer", "images/hexMer.png");
        game.load.image("hexTerre", "images/hexTerre.png");
        game.load.image("hexagon", "images/hexagon.png");
        // dessins regles
        game.load.image("reglesEvo", "images/reglesEVO.png");
        game.load.image("reglesManger", "images/reglesMANGER.png");
        //button
        game.load.spritesheet('button',
                              'images/buttons/flixel-button.png',
                              77,18);
        //SPRITES __________________
        game.load.image("vaisseau", "images/sprites/vaisseau.png");
        var path='images/sprites/resize/';
        for(var phyl in Especes){
            for(var espece in Especes[phyl]){
                game.load.image(espece, path+espece+".png")
            }
        };
    },
    create: function() {

        //camera
        //  Modify the world and camera bounds
        var size=calcBounds(gridSizeX, gridSizeY/2, hexagonWidth*9/8, hexagonHeight*10/8)
        game.world.resize(size[0],size[1]);
        // en 20x20 => game.world.resize(1800,900);

        //board
        hexagonGroup = game.add.group();
        game.stage.backgroundColor = "#000000"
        createHexs();

        // menus à droite
        menuGroup= game.add.group();
        menuGroup.fixedToCamera=true;
        createMenu(menuGroup);
        createBarres(menuGroup);

        // sprites des betes
        betesGroup=game.add.group();
        hexagonGroup.add(betesGroup);

        // LOGIC
        cursors = game.input.keyboard.createCursorKeys();
        // add cancelor right mouseClicked
        // var cb=function (e) {
        //   if (game.input.mouse.button===Phaser.Mouse.RIGHT_BUTTON) {
        //     console.log("cancel");
        //
        //     normal()
        //     game.input.moveCallbacks=[];
        //     if (fantome) {
        //       fantome.delete()
        //     }
        //   }
        // }
        // game.input.keyboard.addkey=cb;

	// MDJ qui commence le jeu
	mdj=new MDJ;
console = new Console;


    },

    update:function () {
        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
        else if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

    },

    render:function () {

        // // todo, infos plus belles
        game.debug.text(console.txt, 0,100);
        for(var i=0; i < mdj.nbJoueurs; i++){
            game.debug.text("joueur : "+i+ " xp : "+ mdj.joueurs[i].xps, 0,400+i*50);
        }
  //    game.debug.text("nb fig : "+betesGroup.length, 0,350);
        game.debug.text("mvts:"+mdj.mvts, 0,300);

        // game.debug.text(mvts, 0,100);

        game.debug.text("ici des textures", 880, 300)
    },

    //  private
    goTo:function () {
        game.state.start("interieur")
    },


}


// global pour le terrain
var terrain;


function createHexs(arg) {
    for(var i = 0; i < gridSizeX/2; i ++){
        for(var j = 0; j < gridSizeY; j ++){
            if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
	        var hexagonX = hexagonWidth*i*1.5+(hexagonWidth/4*3)*(j%2);
	        var hexagonY = hexagonHeight*j/2;
	        var hexagon;
                var x = (Math.floor(Math.random() * 2) == 0);
                if(x){
                    hexagon= game.add.sprite(hexagonX,hexagonY,"hexMer");
                }else{
                    hexagon= game.add.sprite(hexagonX,hexagonY,"hexTerre");
                };
	              hexagonGroup.add(hexagon);
            }
        }
    }
}
