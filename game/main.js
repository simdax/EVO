
window.onload = function() {

    game = new Phaser.Game(800, 600, Phaser.CANVAS, "");
    game.state.add("board", board);
    game.state.add("interieur", interieur);
    game.state.start("board");

}
