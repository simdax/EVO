

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


//alpha

function highlight (point) {
    var indices=autour(point)[0]
    hexagonGroup.setAll('alpha', 1);
    for(var i = 0; i < indices.length; i++) {
        hexagonGroup.getAt(indices[i]).alpha=0.5;
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

//count occurences
function countOcc(arr) {
var counts = {};
for(var i = 0; i< arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num]+1 : 1;
}
return counts}

function values(dict) {
    var res=[];
    for(var val in dict){
        res.push(dict[val])
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
