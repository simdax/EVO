
// pour créer les barres

function createBarres(menuGroup) {


// petite fonction statique pour créer les tables liées
// aux règle et au Manger


function popButton(x,y,w,h,texture,color,offX,offY,group) {


  // les sprites
  // on commence par faire un groupe pour dire que tous ces sprites sont
  //reliés
  var ipadGroup=group||game.add.group()

  // on commence par l'ipad, qui sert à soutenir l'image
  // le menu groupe est juste un truc qui reste fixedToCamera
  menuGroup.add(ipadGroup)
  // le offset sert à le faire "sortir de l'écran"
  var offset=100
  // le offX et offY servent aux images à l'intérieur
  var ipad=game.add.sprite(x+offset,y,"ipad")
  var regle=game.add.sprite(x+offset+offX,y+offY, "regles"+texture);
  ipadGroup.add(ipad); ipadGroup.add(regle);

// après on met un offset offset pour le "manger" qui est plus bas
if (texture=="Manger") {y=y+400}

//on met la texture
var icone=game.add.sprite(x,y,"icone"+texture)

// la regle est cachée et on va la "tweener"
// on fait un groupe qui va réagir au click
// var de merde pour déclencher le bon tween (j'imagine que c'est mieux géré en interne par phaser ?)
  var onTEvo=false;
  var tween=game.add.tween(ipadGroup);
  var bouton=game.add.button(x,y,"b",function () {
    if (! tween.isRunning) {
        if (!onTEvo) {
          tween.to( {x:-700}, 400).start()
          onTEvo=true
        }else{
          tween.to( {x:0}, 500).start()
          onTEvo=false
        }
      }
  });
//     add to group IN THE GOOD ORDER for Z apperea !
      menuGroup.add(bouton)
      menuGroup.add(icone)
      ipadGroup.add(regle)
};

popButton(1100,0,200,200,"Manger","#ff2257",155,90)
popButton(1100,0,200,200,"Evo","#22ff57",155,100,regleGroup)

// ça c'est pour faire les boutons de l'ipad
// et c'est dans le fichier paths.js
gosp()

  // bouton général en-dessous que pour l'instant on poutre pas

//  var rose=draw(300,300,300,'#ff11ff')
  // game.add.button(1100,400,rose,function () {
  //   mdj.endofturn()
  // })
  // var txt=game.add.text(1150,400,"HEY, FINIS TON TOUR ! MAINTENANT! STOP, SUFFIT!",
  // { font: 'bold 20pt Arial', fill: 'green', align: 'left', wordWrap: true, wordWrapWidth: 150 })
  // menuGroup.add(txt)


}
