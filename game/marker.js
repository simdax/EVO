var marker=function (image,joueur) {
    // prop
    this.joueur= joueur //|| !function() {mdj.currentJoueur}()
    this.image=image;
    this.pos=[0,0];
    this.id;
    this.sprite;
    this.esp=getEvo(image)
    //init
    stack.push(this)
    this.create()
};
marker.prototype={

    // 4 fonctions de deplaces
    // 1. checkHex pour savoir où tu désignes sur le plateau
    // 2. place pour savoir si tu peux y aller
    // 3. check pour voir les regeles de deplacement
    // 4. go pour y aller
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
    checkTerrain:function () {
        // terrain est une variabl global attaché aux sprites hexagonaux de terrain
        return  this.esp.type==terrain
    },
    rencontre:function (autre,x,y) {
        if (autre.image=="vaisseau") {
            if (autre.joueur=this.joueur) {
                // elle rentre
                this.joueur.rentrerBete()
            }
            // le vaisseau n'interagit pas avec les bêtes
            // il faudrait aller en-dessous et tout, mais compliqué...
        }
        else if (this.esp.proies.includes(autre.image)) {
            autre.meurt();
            this.go(autre.pos[0],autre.pos[1])
        }
    },
    place: function(){
        var pos=this.checkHex();
        var posX=pos[0]; var posY=pos[1];
        if (this.checkTerrain()) {
            for(var i = 0; i < ids.length; i++) {
	        if (arraysEqual(ids[i].pos,[posX,posY])) {
	            // sound
                    this.rencontre(ids[i])
	            return 0
	        }
            };
            this.go(posX,posY)
        }
    },
    go:function (posX,posY) {
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
    meurt:function   () {
        this.sprite.destroy()
        console.log("aaaaaaarggh");
    }
};
