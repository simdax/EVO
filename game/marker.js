var marker=function (image,joueur) {
  // prop
  this.joueur= joueur //|| !function() {mdj.currentJoueur}()
  this.image=image;
  this.pos=[0,0];
  this.id;
  this.sprite;
  this.esp=getEvo(image)
  //init
  this.create()
};
marker.prototype={

  // 4 fonctions de deplaces
  // 1. checkHex pour savoir où tu désignes sur le plateau
  // 2. place pour savoir si tu peux y aller
  // 3. check pour voir les regeles de deplacement
  // 4. go pour y aller
  checkHex: function(){
    var candidateX = Math.floor((game.input.x-hexagonGroup.x)/sectorWidth);
    var candidateY = Math.floor((game.input.y-hexagonGroup.y)/sectorHeight);
    var deltaX = (game.input.x-hexagonGroup.x)%sectorWidth;
    var deltaY = (game.input.y-hexagonGroup.y)%sectorHeight;
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
  land:function () {
    game.input.addMoveCallback(this.place,this);
    game.input.onDown.addOnce(() => {
      normal();
      game.input.moveCallbacks=[];
      this.sprite.inputEnabled=true;
      ids.push(this)
    },this)
  },
  checkTerrain:function (x,y) {

    var terrain=  hexagonGroup.getAt(convert(x,y));
    var terrainOK;
    if (this.image == "vaisseau") {
        terrainOK=true // le vaisseau va partout
    }else{
      terrainOK= this.esp.type==terrain.key
    }
    return  terrainOK && (terrain.alpha != 1)
  },
  rencontre:function (autre,x,y) {
    if (autre.image=="vaisseau") {
      if (autre.joueur==this.joueur) {
        mdj.current().rentrerBete()
        return true
      }
      return false
      // le vaisseau n'interagit pas avec les bêtes
      // il faudrait aller en-dessous et tout, mais compliqué...
    }
    else if (this.esp.proies.includes(autre.image)) {
      autre.meurt();
      this.go(autre.pos[0],autre.pos[1])
      return true
    }
    else {
      return false
    }
  },
  place: function(){
    // the bool value is for does it should be considered as a move ?
    var pos=this.checkHex();
    var posX=pos[0]; var posY=pos[1];
    if (this.checkTerrain(posX,posY)) {
      for(var i = 0; i < ids.length; i++) {
        if (arraysEqual(ids[i].pos,[posX,posY])) {
          // sound
          return this.rencontre(ids[i])
        }
      };
      this.go(posX,posY); return true
    }
    return false
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
    console.log('click sur '+ this.image+ "de "+ this.joueur);
    if (mdj.currentJoueur==this.joueur) {
      highlight(this.pos)
      fantome=new marker(this.image)
      fantome.sprite.alpha=0.38;
      game.input.addMoveCallback(function() {
        fantome.place()
      },this);
      game.input.onDown.addOnce(function() {
        // cancel
        if (game.input.mouse.button===Phaser.Mouse.RIGHT_BUTTON) {
          console.log("cancel");
        }
        else
        if (this.place()) {
          mdj.update()
        }
        // clear
        game.input.moveCallbacks=[]
        normal();
        fantome.delete()
      },this)
    }
    console.log('click sur '+ this.image+ "de "+ this.joueur);
  },
  cancel:function () {

  },
  create:function () {
    var sp; var img=this.image;
    sp=game.add.sprite(0,0,img);
    //var rond=draw()
    sp.tint= (this.joueur + 0.2) * 	0xCCCCCC
    sp.anchor.setTo(0.5);
    sp.visible=false;
    //events
    sp.events.onInputDown.add(this.click,this)
    betesGroup.add(sp);
    this.sprite=sp
  },
  meurt:function   () {
    this.delete()
    console.log("aaaaaaarggh");
  },
  delete:function () {
    this.sprite.destroy();
    delete fantome
  }
};
