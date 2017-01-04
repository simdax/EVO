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

marker=function () {
    this.sprite
    this.landed=true
};
marker.prototype={
    land:function () {
        this.landed=true
    },
    preload:function (game) {
        // ici feinter avec les couleurs
        game.load.image("marker", "images/vaisseau.png");
        //game.input.onTap.addOnce(this.land,true)
    },
    create:function (game) {
        this.sprite = game.add.sprite(0,0,"marker");
	this.sprite.anchor.setTo(0.5);
        this.sprite.scale.setTo(0.5);
	this.sprite.visible=false;
    },
    move:function () {
        if (this.landed) {
            hexagonGroup.setAll('alpha', 1);
            this.landed=false
        }else{
            hexagonGroup.setAll('alpha', 0.1);
            var index=moveIndex.x%2+Math.floor(moveIndex.x/2)*gridSizeY+2*moveIndex.y;
            console.log(moveIndex);
            console.log(index);
            
            var r=hexagonGroup.getAt(index);
            r.alpha=1;
            this.landed=true
        };
    }
}

board= function (game) {
    this.joueur1;
    this.joueur2;
};

board.prototype={  
    render:function () {
        game.debug.text("appuyez sur x pour switcher", 100,100)
    },
    preload:function () {
	game.load.image("hexagonM", "images/hexMer.png");
        game.load.image("hexagonT", "images/hexTerre.png");
        this.joueur1=new marker; this.joueur1.preload(game)
    },
    create: function() {
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
                    hexagon.scale.setTo(0.138,0.185);
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
        this.joueur1.create(game);
	hexagonGroup.add(this.joueur1.sprite);

        // events
        game.input.addMoveCallback(this.checkHex, this);
        game.input.onDown.add(this.joueur1.move, this)
        // changing state
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)

    },
    
    // private
    goTo:function () {
        game.state.start("interieur")
    },
    checkHex: function(){
        if (this.joueur1.landed) {            
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
            this.placeMarker(candidateX,candidateY);
        }else{
            this.colorizeHex()
        }
    },
    colorizeHex:function (posX,posY) {
        hexagonGroup.getRandom.tint=Math.random() * 0xffffff;
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
