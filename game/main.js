
//window.onload = function() {
    // creating a 320x480 pixels game and executing PlayGame state
    var intr=false;

   game = new Phaser.Game(320, 480, Phaser.AUTO, "");
        // game.state.add("board", board);
        // game.state.add("interieur", interieur);
        // game.state.start("interieur");
//        game.input.onTap(tapF, this)        

//     function create() {
// //        var game = new Phaser.Game(320, 480, Phaser.AUTO, "");
        game.state.add("board", board);
        game.state.add("interieur", interieur);
        game.state.start("board");

function create() {
    
    console.log("fsdf");  game.input.onTap(tapF, this)
};
function update() {
    console.log("ir");
}
    
    function tapF (p, double) {
        console.log('fsdfqsd');
        if (intr) {
            game.state.start("board");
            intr=false;
        }else{
            game.state.start("interieur");
            intr=true;
        };
    };
    
//}
