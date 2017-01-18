// image du jeu

interieur = function (game) {};
interieur.prototype={
  preload: function () {
             game.load.image("interieur","images/interieurIncubateur.jpg" )
           },
  create:function () {
   var img=game.add.image(0,0, "interieur")
   img.scale.setTo(1,0.85);
   game.add.text(30,0,"20");

   //trios en haut
   game.add.text(100,60,"2");
   game.add.text(230,60,"2");
   game.add.text(350,60,"2");


   // trois en bas
   game.add.text(100,470,"2");
   game.add.text(230,470,"2");
   game.add.text(400,420,"2");

   // trois au milieu
   game.add.text(100,270,"2");
   game.add.text(230,300,"2");
   game.add.text(350,200,"2");

   var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
   key.onDown.add(this.goTo, this)
 },
  goTo:function () {
      game.state.start("board", true,false)
    }
};
