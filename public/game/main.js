
window.onload = function() {

    game.state.add("board", boardState);
    game.state.add("interieur", interieur);
    game.state.start("board");

}
