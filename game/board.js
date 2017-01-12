var hexagonWidth = 80;
var hexagonHeight = 70;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var gradient = (hexagonWidth/4)/(hexagonHeight/2);

var gridSizeX = 20;
var gridSizeY = 20;
var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];

var moveIndex=[0,0];
var marker;
//var menuGroup;
var hexagonGroup;
var betesGroup;

var action=true;
var hl=false;
var poserBete=false;


stack=[]
var pointeur=0;
var nb;

function highlight (point) {
    var pos;
    if (point==undefined) {
        pos={x:stack[pointeur].pos[0], y:stack[pointeur].pos[1]};        
    }else{
        pos={x:point[0], y:point[1]};        
    }

    hexagonGroup.setAll('alpha', 0.3);

    //    bon l'algo d'entourag est un peu nul, mais bon...
    var un = [[0,0],[-1,-1],[-1,0],[0,-1],[0,1],[1,1],[1,0]]
    var indices=[];
    for(var i = 0; i < un.length; i++) {
        if (un[i]!==undefined) {
            var x= un[i][0]+pos.x;
            var y= un[i][1]+pos.y;
            //              nawak...
            if (pos.x%2==1) {
                if(un[i][0]==(-1)){y+=1 }
            }else{
                if(un[i][0]==(1)){y-=1 }
            };
            if (x>=0 && y>=0 && x<=(gridSizeX)  && y<(gridSizeY/2)) {
                indices.push ( convert(x,y) )
            }
        }
    };
    for(var i = 0; i < indices.length; i++) {
        hexagonGroup.getAt(indices[i]).alpha=1;
    }
};
function normal() {
    hexagonGroup.setAll('alpha', 1)
}


//maths
function convert (x,y) {
    return x%2 + Math.floor(x/2) * gridSizeY + 2*y;
};

var mvts=4;


var joueur// =new marker("vaisseau",game);


marker=function (image) {
    // prop
    this.image=image;
    this.pos=[0,0];
    this.id;
    this.sprite; this.mvts=4;
    //init
    stack.push(this)
    this.create()
}; 
marker.prototype={
    first:function () {
        this.pos=[moveIndex.x,moveIndex.y];
        action=false; normal();
        this.sprite.events.onInputDown.add(this.grab,this);
    },
    grab:function () {
        hl=true;
        pointeur=this.id;
        if (action) {
            game.sound.play('bip')
            //synth.triggerAttackRelease("B6",0.25)
            var pos=[moveIndex.x, moveIndex.y];
            if(pos != this.pos) {this.pos=pos; mvts -= 1};
            if (mvts==0) {
                mvts=3
            };
            normal(); action=false; 
        }else{
            if(hl)(highlight());
            action=true
        }
    },
    create:function () {
        var sp; var img=this.image;
        !function () {
            sp=game.add.sprite(0,0,img);
        }();
        this.id=stack.length-1;
        pointeur=this.id;
	sp.anchor.setTo(0.5);
        sp.scale.setTo(0.85);
	sp.visible=false;
        sp.inputEnabled=true;
        sp.events.onInputDown.addOnce(
            this.first,this
        );
        // !function () {
        //     betesGroup.add(sp);
        // }()
        this.sprite=sp
    },
};

//stack=[joueur];

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

        joueur=new Joueur();
//        game.add.sprite(40,40,"vaisseau")

        // LOGIC
        cursors = game.input.keyboard.createCursorKeys();
        game.input.addMoveCallback(this.checkHex, this);
        
        //    changing state
        // var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        // key.onDown.add(this.goTo, this)
        // if(hl){highlight()}
        
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
        // game.debug.text(mvts, 0,100);
        // game.debug.text(mvts, 0,100);
        // game.debug.text(mvts, 0,100);
        // game.debug.text(mvts, 0,100);
        
        game.debug.text("ici des textures", 680, 300)
        if (action) {
            game.debug.text("action", 100,150)
        }else{
            game.debug.text("en attente", 100,150)
        };
        game.debug.text("pointeur : "+pointeur, 50,50)
    },
    
    //  private
    goTo:function () {
        game.state.start("interieur")
    },
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
        moveIndex={x:candidateX, y:candidateY};
        if (action ) {
            if(hexagonGroup.getAt(convert(candidateX,candidateY)).alpha==1)
            {
                this.placeMarker(candidateX,candidateY);             
            }
        };
    },
    placeMarker: function(posX,posY){
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
	    stack[pointeur].sprite.visible=false;
	}
	else{
	    stack[pointeur].sprite.visible=true;
	    stack[pointeur].sprite.x = hexagonWidth/4*3*posX+hexagonWidth/2;
	    stack[pointeur].sprite.y = hexagonHeight*posY;
	    if(posX%2==0){
		stack[pointeur].sprite.y += hexagonHeight/2;
	    }
	    else{
		stack[pointeur].sprite.y += hexagonHeight;
	    }
	}
    }
    
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
                // scalage bourrin
                // hexagon.scale.setTo(0.138,0.185);
		hexagonGroup.add(hexagon);
	    }
	}
    }
    // hexagonGroup.y = (game.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
    // if(gridSizeY%2==0){
    //     hexagonGroup.y-=hexagonHeight/4;
    // }
    // hexagonGroup.x = (game.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
    // if(gridSizeX%2==0){
    //     hexagonGroup.x-=hexagonWidth/8;
    // }
}
