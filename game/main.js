
window.onload = function() {


    game = new Phaser.Game(800, 600, Phaser.CANVAS, "");
    //game.add.plugin(Phaser.Plugin.Debug);

    
    var b=game.state.add("board", boardState);
    game.state.add("interieur", interieur);
    game.state.start("board");

}
