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
var menuGroup;
var hexagonGroup;
var betesGroup;

var action=true;
var hl=false;
var poserBete=false;
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

marker=function (image) {
    this.image=image;
    this.pos=[0,0]; this.id;
    this.sprite; this.mvts=4;
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
        var sp = game.add.sprite(0,0,this.image);
        this.id=stack.length-1;
	sp.anchor.setTo(0.5);
        sp.scale.setTo(0.85);
	sp.visible=false;
        sp.inputEnabled=true;
        sp.events.onInputDown.addOnce(
            this.first,this
        );
        betesGroup.add(sp);
        this.sprite=sp
    },
};



var joueur =new marker("vaisseau");

stack=[joueur];

boardState= function (game) {};

boardState.prototype={  
    render:function () {
        
        // todo, infos plus belles
        game.debug.text(mvts, 0,100);
        game.debug.text(mvts, 0,100);
        game.debug.text(mvts, 0,100);
        game.debug.text(mvts, 0,100);
        
        game.debug.text("ici des textures", 680, 300)
        if (action) {
            game.debug.text("action", 100,150)
        }else{
            game.debug.text("en attente", 100,150)
        };
        
        //        game.debug.text("pointeur : "+pointeur, 50,50)
    },
    preload:function () {

        // AUDIO _________________
        game.load.audio('bip', "sound/mp3/button.mp3");

        // BOARD _________________
        
        // terrain
	game.load.image("hexMer", "images/hexMer.png");
        game.load.image("hexTerre", "images/hexTerre.png");
        game.load.image("hexagon", "images/hexagon.png");

        // menus
        
        game.load.image("reglesEvo", "images/reglesEVO.png");
        game.load.image("reglesManger", "images/reglesMANGER.png");
        // TODO place sprite here
        //        graphics
        
        //SPRITES __________________

        
        game.load.image("vaisseau", "images/sprites/vaisseau.png");
        // bebetes
        // todo jquery look at dir ?
        var path='images/sprites/resize/';
        for(var phyl in Especes){
            for(var espece in Especes[phyl]){
                game.load.image(espece, path+espece+".png")
            }
        };

        //Menu
        game.load.spritesheet('button',
                              'images/buttons/flixel-button.png',
                              77,18);
    },
    create: function() {

        //camera
        //  Modify the world and camera bounds
        game.world.resize(3000, 3000);
        
        //board

        createHexGrp();

        // menus à droite

        createMenu();
        ///
        
        betesGroup=game.add.group();
        hexagonGroup.add(betesGroup);
        joueur.create();


        // MENU

        var reduceY=1;
        var reduceX=0.8;
        var espacement = 120;
        var espY=50;
        var offX=0, offY= 450;

        // loop
        var c=0;
        for(var i in Especes) {
            var d=0;
            var posX = c * espacement + offX;
            var posY = d * espY + offY;
            var button = game.add.button
            // phyllum bouton
            ( posX,posY,
              'button', function () {
                  
              });
            menuGroup.add(button);
            var style=
                {'font': '10px Arial',
                 'fill': 'red'}
            ;
            var txt=game.add.text(posX+3,posY+5,i,style);
            menuGroup.add(txt);
            d += 1;
            function addB(name) {
                var cb=
                    () => {
                        highlight(joueur.pos);
                        var niou=new marker(name);
                        stack.push(niou);
                        niou.create();
                        action=true;
                        pointeur=niou.id;
                    };
                for(var x = 0; x < 2; x++) {
                    var button = game.add.button
                    ( posX + (x*50) ,posY, name);
                    // name, cb, this, 2, 1, 0);
                    button.events.onInputDown.add(cb);
                    menuGroup.add(button)
                };
            };
            var labels=Object.keys(Especes[i]);
            for(var gj = 0; gj < labels.length; gj++) {
                var posX = c * espacement + offX;
                var posY = d * espY + offY;
                var button; var caca=Math.random();
                addB(labels[gj])
                d +=1
            };
            c += 1
        };

        // LOGIC
        
        pointeur=0;
        //        this.placeMarker(joueur.pos[0], joueur.pos[1]);        
        
        //      events
        cursors = game.input.keyboard.createCursorKeys();
        game.input.addMoveCallback(this.checkHex, this);
        
        //    changing state
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)
        if(hl){highlight()}

        
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

function createHexGrp(arg) {
    hexagonGroup = game.add.group();
    game.stage.backgroundColor = "#000000"
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

function createMenu() {

    var reglesEvo=game.add.sprite(1400,200, "reglesEvo");
    var reglesManger=game.add.sprite(1400,200, "reglesManger");
    var tweenEvo=game.add.tween(reglesEvo);
    var tweenManger=game.add.tween(reglesManger);
    reglesEvo.fixedToCamera=true;
    reglesManger.fixedToCamera=true;
    
    var onTEvo=false;
    var onTManger=false;

    var grosseBarre;
    menuGroup= game.add.group(grosseBarre);
    menuGroup.fixedToCamera=true;
    
    var do1, do2, bmd, bmd2;

    var width=1200; var height=300;

    //        menuGroup _________
    // grosse barre en bas

    bmd = game.add.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width,height);
    bmd.ctx.fillStyle = '#222222';
    bmd.ctx.fill();
    grosseBarre = game.add.sprite(0,450, bmd);
    menuGroup.add(grosseBarre)
    ///
    
    width=200;  height=200;
    bmd= game.add.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width,height);
    bmd.ctx.fillStyle = '#11ffff';
    bmd.ctx.fill();
    do1=game.add.button(1000,0,bmd,function () {
        if (!onTEvo) {
            tweenEvo.to( {x:400}, 500).start()
            onTEvo=true
        }else{
            tweenEvo.to( {x:1000}, 500).start()
            onTEvo=false
        };
    });
    menuGroup.add(do1)
    width=200;  height=200;
    bmd2 = game.add.bitmapData(width, height);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0, 0, width,height);
    bmd2.ctx.fillStyle = '#ff11ff';
    bmd2.ctx.fill();
    do2=game.add.button(1000,200, bmd2, function () {
        if (!onTManger) {
            tweenManger.to( {x:400}, 500).start()
            onTManger=true
        }else{
            tweenManger.to( {x:1000}, 500).start()
            onTManger=false
        };
    });
    menuGroup.add(do2)

}
