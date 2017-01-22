
// pour créer les barres

function createBarres(menuGroup) {


// petite fonction statique pour créer les tables liées
// aux règle et au Manger


function popButton(x,y,w,h,texture,color) {


  // les sprites

  // on commence par l'ipad, qui sert à soutenir l'image
  // le offset sert à le faire "sortir de l'écran"
  var ipadGroup=game.add.group()
  menuGroup.add(ipadGroup)

  var offset=100
  var ipad=game.add.sprite(x+offset,y,"ipad")
  var regle=game.add.sprite(x+offset+155,y+100, "regles"+texture);
  ipadGroup.add(ipad); ipadGroup.add(regle);

// après on met un offset pour le manger
if (texture=="Manger") {y=y+400}

var icone=game.add.sprite(x,y,"icone"+texture)

// la regle est cachée et on va la "tweener"
// on fait un groupe qui va réagir au click
// ici on se met un petit groupe histoire de se mettre bien
// le menu groupe est juste un truc qui reste fixedToCamera

//tween
var onTEvo=false;
  var tween=game.add.tween(ipadGroup);
//  if (texture=="Manger") {  y=y+400}
  var b=game.add.button(x,y,"b",function () {
    if (! tween.isRunning) {
        if (!onTEvo) {
          tweenBarreBas.to({y:0},400).start();
          tween.to( {x:-700}, 400).start()
          onTEvo=true
        }else{
          tweenBarreBas.to({y:400},500).start();
          tween.to( {x:0}, 500).start()
          onTEvo=false
        }
      }
  });

//     add to group IN THE GOOD ORDER !
      menuGroup.add(b)
      menuGroup.add(icone)
      ipadGroup.add(regle)
};

popButton(1100,0,200,200,"Manger","#ff2257")
popButton(1100,0,200,200,"Evo","#22ff57")



  // bouton général en-dessous

//  var rose=draw(300,300,300,'#ff11ff')
  // game.add.button(1100,400,rose,function () {
  //   mdj.endofturn()
  // })
  // var txt=game.add.text(1150,400,"HEY, FINIS TON TOUR ! MAINTENANT! STOP, SUFFIT!",
  // { font: 'bold 20pt Arial', fill: 'green', align: 'left', wordWrap: true, wordWrapWidth: 150 })
  // menuGroup.add(txt)


}
