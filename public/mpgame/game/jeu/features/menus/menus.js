define(function() {
    
var Menu=function (board) {

  this.groupes=board.groupes;
  this.tweenBarreBas={}

  this.createMenu=function () {

    // grosse barre en bas
    // on la place dans un groupe
    // et on lui met un this.tween qui permettra de réagir au bouton à droite
    this.tweenBarreBas.haut=game.add.tween(this.groupes.grosseBarre).to({y:0},100)
    this.tweenBarreBas.bas=game.add.tween(this.groupes.grosseBarre).to({y:400},100)

    this.groupes.grosseBarre.y = 400;

    var width=1200; var height=300;
    //  bmd=draw(1200,300)
    bmd = game.add.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width,height);
    bmd.ctx.fillStyle = '#222222';
    bmd.ctx.fill();

    /// add barre sprite
    var barre = game.add.sprite(0,400, bmd);
    this.groupes.grosseBarre.add(barre)


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
            this.groupes.hexagon.alpha=1
            hl=false
          }else{
            this.groupes.hexagon.alpha=0.2;
            this.groupes.betes.forEach(function (bete){
              console.log(bete)
            });
            hl=true
          }
        });
        this.groupes.grosseBarre.add(button);
        var style=
        {'font': '10px Arial',
        'fill': 'red'
      };
      var txt=game.add.text(posX+3,posY+5,i,style);
      this.groupes.grosseBarre.add(txt);

      // especes bouton
      var buyEsp=function (button){
        var res= Board.mdj.joueur.acheter(button.esp);
      };
      var count=0;
      for(var esp in Especes[i]){
        var buton = game.add.button( posX,20+posY+20*count, 'button', buyEsp );
        buton.tint=0x000000;
        this.groupes.grosseBarre.add(buton);
        couleursBouttons[esp]=buton;
        var txt=game.add.text(posX+15,22+posY+20*count,esp,style);
        this.groupes.grosseBarre.add(txt);
        buton.esp=esp;
        count+=1
      }
      d += 1;
      var addB = function (name) {
        var cb=
        () => {
          var sp=mdj.joueur.create(name)
          if(sp!=-1){
            sp.landing=true; // c'est pour indiquer que ce n'est pas un mouvement !
            sp.pos=mdj.joueur.vaisseau.pos
            sp.land();

            // ça c'est une petite feinte, l'input est disabled quand on saisit pour éviter les
            // effets de "regrabbing"
            mdj.joueur.vaisseau.sprite.inputEnabled=true
          }
        };
        for(var x = 0; x < 2; x++) {
          var button = game.add.button( posX + (x*50) , 30+posY, name);
          button.events.onInputDown.add(cb);
          this.groupes.grosseBarre.add(button)
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
  }
    return Menu

})
