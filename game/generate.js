// ça c'était avant

function genererClassique(hexagonX,hexagonY) {
                var x = (Math.floor(Math.random() * 2) == 0);
        if(x){
            hexagon= game.add.sprite(hexagonX,hexagonY,"hexMer");
        }else{
            hexagon= game.add.sprite(hexagonX,hexagonY,"hexTerre");
        };
                  hexagonGroup.add(hexagon);

}

// la main loop
function createHexs() {
  for(var i = 0; i < gridSizeX/2; i ++){
    for(var j = 0; j < gridSizeY; j ++){
      if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
        var hexagonX = hexagonWidth*i*1.5+(hexagonWidth/4*3)*(j%2);
        var hexagonY = hexagonHeight*j/2;
      //  genererClassique(hexagonX,hexagonY)

//je commence par tout peupler par des hexa jaunes "neutres"
        var hexagon;
        hexagon= game.add.sprite(hexagonX,hexagonY,"hexagon");
        hexagonGroup.add(hexagon);
      }
    }
  }
 generer()
}


// les fonction de choix. le premier est choisi au milieu de la map
function takeFirst() {
  // var x= Math.floor(Math.random() * gridSizeX)
  // var y= Math.floor(Math.random() * gridSizeY/2)
  var x=10; y=5;
  var h=hexagonGroup.getAt(convert(x,y));
  if (h.key=='hexagon') {
      h.loadTexture('hexTerre')
  }
    return[x,y]
  }
function chooseAutour(cells) {
  for (var i = 0; i < cells.length; i++) {
    if (Math.random()>0.5) {
      return cells[i]
    }
  }
  // sinon
      return cells[0]
}

// juste les fonctions pour changer la texture des hexa jaunes en hexa de terre ou mer
changeText=function (pos,texture) {
  hexagonGroup.getAt(pos).loadTexture(texture)
}
// je retourne un boolean pour savoir si la piece pourra être un nouveau pt de depart
function chooseText(hex) {
  if (Math.random() > 0.5) {
    changeText(hex,"hexTerre")
    return true
  }else{
    changeText(hex,"hexMer")
    return false
  }
}

// ce callback permet juste de faire un truc delayé dans le temps et de "voir" l'algo
var cb=function (casesAutour,n) {
  setTimeout( () => {generer(chooseAutour(casesAutour),n+1)}, 0 )
//generer(chooseAutour(casesAutour),n+1)
}

var already=[] // les cases déja choisies
var iter=100;
function generer(c,nb) {
  var cell= c || takeFirst();
  already.push(cell)
  var n=nb || 0;
  var tmp=autour(cell); // fonction pour choper les cases d'a côté
  var indices=tmp[1];   var casesAutour=tmp[0];
  console.log("casesAutour"+casesAutour);
  var goodcells=[];
  for (var i = 0; i < casesAutour.length; i++) {
    console.log(hexagonGroup.getAt(casesAutour[i]).key);
    // si la case est neutre, colorie-la, et met la dans les next candidats si elle est "terre"
    if (hexagonGroup.getAt(casesAutour[i]).key=='hexagon') {
      if (chooseText(casesAutour[i]) ){
        goodcells.push(trouvePos(cell,indices[i]))
      }
    }else if // la case est déjà coloriée, et qu'elle est "terre," put la dans les possibilités
    (hexagonGroup.getAt(casesAutour[i]).key=='hexTerre') {
          goodcells.push(trouvePos(cell,indices[i]))
    }
  };
  if (n<iter) {
      if (goodcells.length==0) {
            // choisit une nouvelle terre
            console.log("choisit une nouvelle terre");
        for (var i = 0; i < hexagonGroup.length; i++) {
            console.log(hexagonGroup.getAt(i));
          if(hexagonGroup.getAt(i).key=="hexTerre"){
            generer(checkHex(hexagonGroup.getAt().x,hexagonGroup.getAt(i).y),n+1) // on redémarre depuis une autre terre
            return 0
          }
        }
  }else // sinon continue pépouze
  {  cb(goodcells,n)}
}else{
  // colorie le reste des hexagons en "mer"
  for (var i = 0; i < hexagonGroup.length; i++) {
    if(hexagonGroup.getAt(i).key=="hexagon"){
      hexagonGroup.getAt(i).loadTexture("hexMer")
    }
  }
}
}
