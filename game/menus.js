
couleursBouttons= {}

/*global functionname */
function createBarres(menuGroup) {

  var onTEvo=false;
  var onTManger=false;
  var grosseBarre;
  var do1, do2, bmd, bmd2;
  var width, height;

  /// petits carrés à côté
  width=200;  height=400;
  bmd= game.add.bitmapData(width, height);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, width,height);
  bmd.ctx.fillStyle = '#11ffff';
  bmd.ctx.fill();
  do1=game.add.button(1200,0,bmd,function () {
        if (!onTEvo) {
          tweenEvo.to( {x:710}, 500).start()
          onTEvo=true
        }else{
          tweenEvo.to( {x:1600}, 500).start()
          onTEvo=false
        };
      });
  menuGroup.add(do1)
  width=200;  height=400;
  bmd2 = game.add.bitmapData(width, height);
  bmd2.ctx.beginPath();
  bmd2.ctx.rect(0, 0, width,height);
  bmd2.ctx.fillStyle = '#ff11ff';
  bmd2.ctx.fill();
  do2=game.add.button(1200,400, bmd2, function () {
        if (!onTManger) {
          tweenManger.to( {x:710}, 500).start()
          onTManger=true
        }else{
          tweenManger.to( {x:1600}, 500).start()
          onTManger=false
        };
      });
  menuGroup.add(do2)

  // les regles qu popent
  var reglesEvo=game.add.sprite(1600,0, "reglesEvo");
  var reglesManger=game.add.sprite(1600,0, "reglesManger");
  var tweenEvo=game.add.tween(reglesEvo);
  var tweenManger=game.add.tween(reglesManger);
  menuGroup.add(reglesEvo)
  menuGroup.add(reglesManger)


}

function createMenu(menuGroup) {

  // grosse barre en bas

  var width=1200; var height=300;
//  bmd=draw(1200,300)
  bmd = game.add.bitmapData(width, height);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, width,height);
  bmd.ctx.fillStyle = '#222222';
  bmd.ctx.fill();
  grosseBarre = game.add.sprite(0,400, bmd);
  menuGroup.add(grosseBarre)

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
    menuGroup.add(button);
    var style=
      {'font': '10px Arial',
       'fill': 'red'
      };
    var txt=game.add.text(posX+3,posY+5,i,style);
    menuGroup.add(txt);

    // especes bouton
    function buyEsp(button){
      var res= mdj.current().acheter(button.esp);
    }
    var count=0;
    for(var esp in Especes[i]){
      var buton = game.add.button( posX,20+posY+20*count, 'button', buyEsp );
      buton.tint=0x000000;
      menuGroup.add(buton);
      couleursBouttons[esp]=buton;
      var txt=game.add.text(posX+15,22+posY+20*count,esp,style);
      menuGroup.add(txt);
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
        menuGroup.add(button)
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
