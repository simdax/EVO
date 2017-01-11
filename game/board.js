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

    hexagonGroup.setAll('alpha', 0.1);

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

var mvts=3;

marker=function (image) {
    this.image=image;
    this.pos=[0,0]; this.id;
    this.sprite; this.mvts=4;
}; 
marker.prototype={
    first:function () {
//        bip.start();
        this.pos=[moveIndex.x,moveIndex.y];
        action=false; normal();
        this.sprite.events.onInputDown.add(this.grab,this);
    },
    grab:function () {
        //bip.start()
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
        if (action) {
            game.debug.text("action", 100,150)
        }else{
            game.debug.text("en attente", 100,150)
        };
        game.debug.text(mvts, 0,100);
        game.debug.text("pointeur : "+pointeur, 50,50)
    },
    preload:function () {

        // audio
        game.load.audio('bip', "sound/mp3/button.mp3");
        // terrain
	game.load.image("hexMer", "images/hexMer.png");
        game.load.image("hexTerre", "images/hexTerre.png");
        game.load.image("vaisseau", "images/vaisseau.png");
        game.load.image("hexagon", "images/hexagon.png");
        
        //Menu
        game.load.spritesheet('button',
                              'images/buttons/flixel-button.png',
                              77,18);
    },
    create: function() {
        createHexGrp();
        betesGroup=game.add.group();
        hexagonGroup.add(betesGroup);
        joueur.create();
        // menu
        var reduceY=1;
        var reduceX=0.8;
        var espacement = 70;
        var c=0;
        for(var i in Especes) {
            var d=0;
            var posX = c * espacement + 80;
            var posY = d * 25 + 500;
            button = game.add.button
            //new LabelButton
            ( posX,posY,
              'button', function () {
                  
              });
            button.scale.setTo(reduceX,reduceY);
            game.add.text(posX+3,posY+5,i,
                          {'font': '10px Arial',
                           'fill': 'red'    }
                         );
            var labels=Object.keys(Especes[i]);
            d += 1;
            for(var j = 0; j < labels.length; j++) {
                var posX = c * espacement + 80;
                var posY = d * 25 + 500;
                button = game.add.button
                //new LabelButton
                ( posX,posY,
                  'button',
                  //"salut ",
                  function () {
                      highlight(joueur.pos);
                      var niou=new marker("hexagon");
                      stack.push(niou);
                      console.log(joueur);
                      niou.create();
                      action=true;
                      pointeur=niou.id;
                  }, this, 2, 1, 0);
                button.scale.setTo(reduceX,reduceY);
                game.add.text(posX+10,posY+5,labels[j],
                              {'font': '10px Arial',
                               'fill': 'black'    }
                             );
                d +=1
            };
            c += 1
        };

        pointeur=0;
        //        this.placeMarker(joueur.pos[0], joueur.pos[1]);        
        
        //      events
        game.input.addMoveCallback(this.checkHex, this);
        
        //    changing state
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)
        if(hl){highlight()}
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
    hexagonGroup.y = (game.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
    if(gridSizeY%2==0){
        hexagonGroup.y-=hexagonHeight/4;
    }
    hexagonGroup.x = (game.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
    if(gridSizeX%2==0){
        hexagonGroup.x-=hexagonWidth/8;
    }
}
