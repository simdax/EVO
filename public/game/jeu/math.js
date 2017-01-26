
  checkHex= function(){
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
  };

function convert (x,y) {
    return x%2 + Math.floor(x/2) * gridSizeY + 2*y;
};

function trouvePos(cell,index) {
  var autour=  [[-1,-1],[-1,0],[0,-1],[0,1],[1,1],[1,0]]
  return [cell[0]+autour[index][0],cell[1]+autour[index][1]]
}

//    bon l'algo d'entourag est un peu nul, mais bon...

function autour(point){

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
            if (x>=0 && y>=0 && x<=(gridSizeX)  && y<(gridSizeY/2)) {
                indices.push ( convert(x,y) )
                ii.push(i)
            }
    };
    return [indices,ii]
}
