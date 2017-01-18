

// phaser geo

function draw(w,h,color){

  var width = 100 || w // example;
  var height = 100 || h // example;
  var bmd = game.add.bitmapData(width, height);

  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, width, height);
  bmd.ctx.fillStyle = '#ffffff' || color;
  bmd.ctx.fill();
  return  game.add.sprite(game.world.centerX, game.world.centerY, bmd);

}



//maths + hexa

function convert (x,y) {
    return x%2 + Math.floor(x/2) * gridSizeY + 2*y;
};

//    bon l'algo d'entourag est un peu nul, mais bon...

function autour(point){

    var pos={x:point[0], y:point[1]};
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
    return indices
}

function highlight (point) {
    var indices=autour(point)
    hexagonGroup.setAll('alpha', 0.3);
    for(var i = 0; i < indices.length; i++) {
        hexagonGroup.getAt(indices[i]).alpha=1;
    }
};
function normal() {
    hexagonGroup.setAll('alpha', 1)
}


//// dic manipualmtion

function check(dic,k) {
    var keys=Object.keys(dic);
    for(var i = 0; i<keys.length ; i++) {
        if((Object.keys(dic[keys[i]])).indexOf(k) >= 0){return true}
    };
    return false
};

function get(key,dict) {
        var k=Object.keys(dict);
        for(var i = 0; i < k.length; i++) {
            if((Object.keys(dict[k[i]])).indexOf(key) >= 0){
                return dict[k[i]][key]
            } // exists
        }
        return -1; //error
    }

function getEvo(name) {
    for(var phyl in Especes){
        for(var esp in Especes[phyl]){
            if (esp==name) {
                return Especes[phyl][name]
            }
        }
    }
    //error
    return -1
}

function allKeys() {
    var res=[];
    for(var ph in Especes){
        res.push(Object.keys(Especes[ph]))
    }
    return res
}

/// equality

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
