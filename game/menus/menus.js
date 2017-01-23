

function createMenu(menuGroup) {

// ça c'est pour faire les boutons de l'ipad
gosp()


  // grosse barre en bas
// on la place dans un groupe
// et on lui met un tween qui permettra de réagir au bouton à droite
var grosseBarre=game.add.group()
tweenBarreBas=game.add.tween(grosseBarre)
menuGroup.add(grosseBarre)
grosseBarre.y = 400;

  var width=1200; var height=300;
//  bmd=draw(1200,300)
  bmd = game.add.bitmapData(width, height);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, width,height);
  bmd.ctx.fillStyle = '#222222';
  bmd.ctx.fill();
  barre = game.add.sprite(0,400, bmd);
  grosseBarre.add(barre)


  var reduceY=1;
  var reduceX=0.8;
  var espacement = 120;
  var espY=50;
  var offX=0, offY= 400;

  // loop
  var c=0;
  for(var i in Especes) {
    var d=0;
    var posX = c * espacement + offX;
    var posY = d * espY + offY;

    // phyllum bouton
    //
    var hl=false;
    var button = game.add.button
    ( posX,posY,
      'button', function () {
                  if(hl){
                    hexagonGroup.alpha=1
                    hl=false
                  }else{
                      hexagonGroup.alpha=0.2;
                    betesGroup.forEach(function (bete){
                      console.log(bete)
                    });
                    hl=true
                  }
                });
    grosseBarre.add(button);
    var style=
      {'font': '10px Arial',
       'fill': 'red'
      };
    var txt=game.add.text(posX+3,posY+5,i,style);
    grosseBarre.add(txt);

    // especes bouton
    function buyEsp(button){
      var res= mdj.current().acheter(button.esp);
    }
    var count=0;
    for(var esp in Especes[i]){
      var buton = game.add.button( posX,20+posY+20*count, 'button', buyEsp );
      buton.tint=0x000000;
      grosseBarre.add(buton);
      couleursBouttons[esp]=buton;
      var txt=game.add.text(posX+15,22+posY+20*count,esp,style);
      grosseBarre.add(txt);
      buton.esp=esp;
      count+=1
    }
    d += 1;
    function addB(name) {
      var cb=
        () => {
          var sp=mdj.current().create(name)
          if(sp!=-1){
            highlight(mdj.current().vaisseau.pos);
            sp.land()
          }
        };
      for(var x = 0; x < 2; x++) {
        var button = game.add.button( posX + (x*50) , 30+posY, name);
        button.events.onInputDown.add(cb);
        grosseBarre.add(button)
      };
    };
    var labels=Object.keys(Especes[i]);
    for(var gj = 0; gj < labels.length; gj++) {
      var posX = c * espacement + offX;
      var posY = d * espY + offY;
      var button;
      addB(labels[gj])
      d +=1
    };
    c += 1
  };

}
