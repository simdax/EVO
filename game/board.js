var hexagonWidth = 80;
var hexagonHeight = 70;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var gradient = (hexagonWidth/4)/(hexagonHeight/2);

var gridSizeX = 10;
var gridSizeY = 10;
var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];

var moveIndex=[0,0];
var marker;
//var menuGroup;
var hexagonGroup;
var betesGroup;

var action=true;
var hl=false;
var land=false;
var poserBete=false;

var ids=[];
stack=[]
var pointeur=0;

moveCallback=function() {
    this.current().vaisseau.sprite.x=game.input.x
    this.current().vaisseau.sprite.y=game.input.y
}


MDJ=function () {

    this.nbJoueurs=2;
    this.joueurs=[];
    this.currentJoueur=0

    for(var i = 0; i < this.nbJoueurs; i++) {
        this.joueurs.push(new Joueur(i))
    };


    // ce sont des fonctions pour le debut de partie, tranquillou
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
    	    }
    	}
    };
    game.input.addMoveCallback(mC,this);
    game.input.onDown.add(input,this);

}

MDJ.prototype={
    next:function () {
        this.currentJoueur =  (this.currentJoueur +1) % this.nbJoueurs
    },
    current:function () {
        return this.joueurs[this.currentJoueur]
    },
    update:function () {
	mvts-=1;
	if (mvts==0) {
            mdj.next();
            mvts=4
        };
    },

}



mvts=4;

marker=function (image,joueur) {
    // prop
    this.joueur= joueur //|| !function() {mdj.currentJoueur}()
    this.image=image;
    this.pos=[0,0];
    this.id;
    this.sprite;
    //init
    stack.push(this)
    this.create()
};
marker.prototype={
    checkHex: function(){
        var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
        var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
        var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
        var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
        if(candidateX%2==0){
            if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
                candidateX--;
                candidateY--;
            }
            if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
                candidateX--;
            }
        }
        else{
            if(deltaY>=hexagonHeight/2){
                if(deltaX<(hexagonWidth/2-deltaY*gradient)){
                    candidateX--;
                }
            }
            else{
                if(deltaX<deltaY*gradient){
                    candidateX--;
                }
                else{
                    candidateY--;
                }
            }
        }
	return [candidateX, candidateY]
    },
    place: function(){
	var pos=this.checkHex();
	var posX=pos[0]; var posY=pos[1];
	for(var i = 0; i < ids.length; i++) {
	    if (arraysEqual(ids[i].pos,[posX,posY])) {
		// sound
		console.log("touched");
		return 0
	    }
	}
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
	    this.sprite.visible=false;
	}
	else{
	    this.sprite.visible=true;
	    this.sprite.x = hexagonWidth/4*3*posX+hexagonWidth/2;
	    this.sprite.y = hexagonHeight*posY;
	    if(posX%2==0){
		this.sprite.y += hexagonHeight/2;
	    }
	    else{
		this.sprite.y += hexagonHeight;
	    };
	    this.pos=[posX,posY]
	};
    },
    click:function() {
	if (mdj.currentJoueur==this.joueur) {
	    highlight(this.pos)
	    var fantome=game.add.sprite(0,0,this.image)
	    fantome.anchor.setTo(0.5)
	    fantome.alpha=0.38;
	    game.input.addMoveCallback(function() {
		fantome.x=game.input.x
		fantome.y=game.input.y
	    });
	    game.input.onDown.addOnce(function() {
		normal(); fantome.destroy();
		game.input.moveCallbacks=[]
		this.place();
		mdj.update()
	    },this)
	}
    },
    create:function () {
        var sp; var img=this.image;
        sp=game.add.sprite(0,0,img);
	var rond=draw()
	sp.tint= (this.joueur + 0.2) * 	0xCCCCCC
	sp.anchor.setTo(0.5);
	sp.visible=false;
	//events
	sp.events.onInputDown.add(this.click,this)
        betesGroup.add(sp);
        this.sprite=sp
    },
};



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
        game.world.resize(2000, 2000);

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

	// MDJ qui commence le jeu
	mdj=new MDJ;


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
        //game.debug.text("current : "+mdj.current(), 0,100);
      for(var i=0; i < mdj.nbJoueurs; i++){
        game.debug.text("joueur : "+i+ " xp : "+ mdj.joueurs[i].xps, 0,400+i*50);
      }
        game.debug.text("nb fig : "+betesGroup.length, 0,350);
        game.debug.text("joueur"+  "(via mdj): "+mdj.currentJoueur, 0,200);
        game.debug.text("fig ID : "+pointeur, 0,50)
        game.debug.text("mvts:"+mvts, 0,300);

        // game.debug.text(mvts, 0,100);

        game.debug.text("ici des textures", 880, 300)
        if (action) {
            game.debug.text("action", 100,150)
        }else{
            game.debug.text("en attente", 100,150)
        };
    },

    //  private
    goTo:function () {
        game.state.start("interieur")
    },


}

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
