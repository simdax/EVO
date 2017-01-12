
window.onload = function() {

    game = new Phaser.Game(1200, 800, Phaser.CANVAS, "");

    
    game.state.add("board", boardState);
    game.state.add("interieur", interieur);
    game.state.start("board");

}
