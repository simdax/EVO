
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var menu=function(game) {
    this.button;
    this.background;
};

{
preload: function() {

    var s=game.load.spritesheet('button', 'images/buttons/button_sprite_sheet.png', 193, 71);

},


    create: function() {

    game.stage.backgroundColor = '#182d3b';

    for(var i = 0; i < 5; i++) {
        for(var j = 0; j < 5; j++) {
            button = game.add.button(
                i * 100,
                j * 100,
                'button',
                actionOnClick, this, 2, 1, 0);
            button.scale.setTo(0.5)
        }; 
    }


    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);

}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    background.visible =! background.visible;

}
}
