
interieur = function (game) {};
interieur.prototype={
    preload: function () {
        game.load.image("interieur","interieurIncubateur.jpg" )
    },
    create:function () {
        var img=game.add.image(0,0, "interieur")
        img.scale.setTo(0.5);
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)
    },
    goTo:function () {
        game.state.start("board")
    }
};
