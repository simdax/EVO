function createBarres(menuGroup) {
    
    var onTEvo=false;
    var onTManger=false;
    var grosseBarre;
    var do1, do2, bmd, bmd2;
    var width, height;

    /// petits carrés à côté
    width=200;  height=200;
    bmd= game.add.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width,height);
    bmd.ctx.fillStyle = '#11ffff';
    bmd.ctx.fill();
    do1=game.add.button(1000,0,bmd,function () {
        if (!onTEvo) {
            tweenEvo.to( {x:800}, 500).start()
            onTEvo=true
        }else{
            tweenEvo.to( {x:1600}, 500).start()
            onTEvo=false
        };
    });
    menuGroup.add(do1)
    width=200;  height=200;
    bmd2 = game.add.bitmapData(width, height);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0, 0, width,height);
    bmd2.ctx.fillStyle = '#ff11ff';
    bmd2.ctx.fill();
    do2=game.add.button(1000,200, bmd2, function () {
        if (!onTManger) {
            tweenManger.to( {x:800}, 500).start()
            onTManger=true
        }else{
            tweenManger.to( {x:1600}, 500).start()
            onTManger=false
        };
    });
    menuGroup.add(do2)

    // les regles qu popent
    var reglesEvo=game.add.sprite(1600,200, "reglesEvo");
    var reglesManger=game.add.sprite(1600,200, "reglesManger");
    var tweenEvo=game.add.tween(reglesEvo);
    var tweenManger=game.add.tween(reglesManger);
    menuGroup.add(reglesEvo)
    menuGroup.add(reglesManger)


}

function createMenu(menuGroup) {

    // grosse barre en bas

    var width=1200; var height=300;
    
    bmd = game.add.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width,height);
    bmd.ctx.fillStyle = '#222222';
    bmd.ctx.fill();
    grosseBarre = game.add.sprite(0,450, bmd);
    menuGroup.add(grosseBarre)

    var reduceY=1;
    var reduceX=0.8;
    var espacement = 120;
    var espY=50;
    var offX=0, offY= 450;
    
    // loop
    var c=0;
    for(var i in Especes) {
        var d=0;
        var posX = c * espacement + offX;
        var posY = d * espY + offY;
        var button = game.add.button
        // phyllum bouton
        ( posX,posY,
          'button', function () {
              // todo highlight or what?
          });
        menuGroup.add(button);
        var style=
            {'font': '10px Arial',
             'fill': 'red'
            };
        var txt=game.add.text(posX+3,posY+5,i,style);
        menuGroup.add(txt);
        d += 1;
        function addB(name) {
            var cb=
                () => {
                    highlight(mdj.current().vaisseau.pos);
                    var sp=mdj.current().create(name,mdj.currentJoueur)
		    game.input.addMoveCallback(sp.place,sp);
		    game.input.onDown.addOnce(() => {
		    	normal();
		    	game.input.moveCallbacks=[];
		    	sp.sprite.inputEnabled=true;
			ids.push(sp)
		    },this)
                };
            for(var x = 0; x < 2; x++) {
                var button = game.add.button
                ( posX + (x*50) ,posY, name);
                // name, cb, this, 2, 1, 0);
                button.events.onInputDown.add(cb);
                menuGroup.add(button)
            };
        };
        var labels=Object.keys(Especes[i]);
        for(var gj = 0; gj < labels.length; gj++) {
            var posX = c * espacement + offX;
            var posY = d * espY + offY;
            var button; var caca=Math.random();
            addB(labels[gj])
            d +=1
        };
        c += 1
    };

}
