var HexagonTools=function(game,map) {

this.game=game;
this.map=map;

  this.checkHex=function (){
    var candidateX = Math.floor((this.game.input.worldX)/map.sectorWidth);
    var candidateY = Math.floor((this.game.input.worldY)/map.sectorHeight);
    var deltaX = (this.game.input.worldX)%map.sectorWidth;
    var deltaY = (this.game.input.worldY)%map.sectorHeight;
    if(candidateX%2==0){
      if(deltaX<((map.hexagonWidth/4)-deltaY*map.gradient)){
        candidateX--;
        candidateY--;
      }
      if(deltaX<((-map.hexagonWidth/4)+deltaY*map.gradient)){
        candidateX--;
      }
    }
    else{
      if(deltaY>=map.hexagonHeight/2){
        if(deltaX<(map.hexagonWidth/2-deltaY*map.gradient)){
          candidateX--;
        }
      }
      else{
        if(deltaX<deltaY*map.gradient){
          candidateX--;
        }
        else{
          candidateY--;
        }
      }
    }
    return [candidateX, candidateY]
  };

this.convert=function  (x,y) {
    return x%2 + Math.floor(x/2) * this.map.gridSizeY + 2*y;
};

 this.trouvePos=function(cell,index) {
  var autour=  [[-1,-1],[-1,0],[0,-1],[0,1],[1,1],[1,0]]
  return [cell[0]+autour[index][0],cell[1]+autour[index][1]]
}

//    bon l'algo d'entourag est un peu nul, mais bon...

this.autour=function(point){

    var pos={x:point[0], y:point[1]};
    var un =   [[-1,-1],[-1,0],[0,-1],[0,1],[1,1],[1,0]]
      //[0,0],
    var indices=[]; var ii=[]
    for(var i = 0; i < un.length; i++) {
            var x= un[i][0]+pos.x;
            var y= un[i][1]+pos.y;
            //              nawak...
            if (pos.x%2==1) {
                if(un[i][0]==(-1)){y+=1 }
            }else{
                if(un[i][0]==(1)){y-=1 }
            };
            if (x>=0 && y>=0 && x<=(this.map.gridSizeX)  && y<(this.map.gridSizeY/2)) {
                indices.push ( this.convert(x,y) )
                ii.push(i)
            }
    };
    return [indices,ii]
}

}
