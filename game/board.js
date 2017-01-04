var hexagonWidth = 80;
var hexagonHeight = 70;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var gradient = (hexagonWidth/4)/(hexagonHeight/2);

var gridSizeX = 10;
var gridSizeY = 10;
var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];

var moveIndex;
var marker;
var hexagonGroup;

var select=true;
var hl=true;

// bon l'algo d'entourag est un peu nul, mais bon...
var un = [[0,0],[-1,-1],[-1,0],[0,-1],[0,1],[1,1],[1,0]]

function highlight () {
        var pos=moveIndex;
        hexagonGroup.setAll('alpha', 0.1);
        var indices=[];
        for(var i = 0; i < un.length; i++) {
            if (un[i]!==undefined) {
                var x= un[i][0]+pos.x;
                var y= un[i][1]+pos.y;
                // nawak...
                if (pos.x%2==1) {
                    if(un[i][0]==(-1)){y+=1 }
                }else{
                    if(un[i][0]==(1)){y-=1 }
                };
                if (x>=0 && y>=0 && x<gridSizeX && y<gridSizeY) {
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

var mouse;
Mouse=function () {   
}
Mouse.prototype={
    go:function () {
        select = !select
    },

};
mouse=new Mouse();

//maths
function convert (x,y) {
    return x%2 + Math.floor(x/2) * gridSizeY + 2*y;
};



marker=function () {
    this.mvts=3;
    this.sprite;
};
marker.prototype={
    preload:function (game) {
        // ici feinter avec les couleurs
        game.load.image("marker", "images/vaisseau.png");
        //game.input.onTap.addOnce(this.land,true)
    },
    create:function (game) {
        this.sprite = game.add.sprite(0,0,"marker");
	this.sprite.anchor.setTo(0.5);
        this.sprite.scale.setTo(0.85);
	this.sprite.visible=false;
        this.sprite.inputEnabled=true;
        this.sprite.events.onInputDown.add(function () {
            if (hl) {
                normal(); hl=false;
            }else{highlight(); hl=true}
        }, this);
    },
};

board= function (game) {
    this.joueur1;
    this.joueur2;
};

board.prototype={  
    render:function () {
        game.debug.text("appuyez sur x pour switcher", 100,100)
        game.debug.text(select, 100,150)
    },
    preload:function () {
	game.load.image("hexagonM", "images/hexagon.png");
        game.load.image("hexagonT", "images/hexagon.png");
        this.joueur1=new marker; this.joueur1.preload(game)
    },
    create: function() {
        createHexGrp();
        this.joueur1.create(game);
        
	hexagonGroup.add(this.joueur1.sprite);
        this.placeMarker(0,0);
        
        // events
        game.input.addMoveCallback(this.checkHex, this);
        game.input.onDown.add(mouse.go,this);

        
        // changing state
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)

    },
    
    // private
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
        if (select) {
            if(hexagonGroup.getAt(convert(candidateX,candidateY)).alpha==1)
            {
                this.placeMarker(candidateX,candidateY);             
            }
        };
    },
    placeMarker: function(posX,posY){
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
	    this.joueur1.sprite.visible=false;
	}
	else{
	    this.joueur1.sprite.visible=true;
	    this.joueur1.sprite.x = hexagonWidth/4*3*posX+hexagonWidth/2;
	    this.joueur1.sprite.y = hexagonHeight*posY;
	    if(posX%2==0){
		this.joueur1.sprite.y += hexagonHeight/2;
	    }
	    else{
		this.joueur1.sprite.y += hexagonHeight;
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
                    hexagon= game.add.sprite(hexagonX,hexagonY,"hexagonT");
                }else{
                    hexagon= game.add.sprite(hexagonX,hexagonY,"hexagonM");
                };
                // scalage bourrin
                //hexagon.scale.setTo(0.138,0.185);
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
