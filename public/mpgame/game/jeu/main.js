

require.config({
    baseUrl:"jeu/core",
    paths:{

        lang:"helpers/lang",
        math:"helpers/math",

        pion:"marker/pion",
        collisions:"marker/collisions",
        landing:"marker/landing",
        marker:"marker/marker",

        gen:"board/gen/generate",
        groupes:"board/groupes",
        light:"board/light",
        map:"board/map",
        board:"board/main",

        especes:"interface/especes",
        joueur:"interface/joueur",
        mdj:"interface/mdj",
        
        callbacks:"server/callbacks",
        network:"server/network",
        game:"server/game",
    }
})


require(['game','callbacks','network'],function(Game,Callbacks,Network) {


    var canvas=new Phaser.Game(1200,1200,Phaser.AUTO);
    var g=new Game(canvas,0,0,2)
    ga= new Callbacks(g)
//    console.log(Network);
  
})
