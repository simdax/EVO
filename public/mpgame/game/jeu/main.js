

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

console.log("ta mere");

require(['game','callbacks','network'],function(Game,Callbacks,Network) {

    console.log(Game);
    console.log(Callbacks);
    console.log(Network);
  
})
