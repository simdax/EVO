define(['math','light'],function(HexagonTools,Light) {

    var Groupes=function (game,map){

        this.tools=new HexagonTools(game,map);

        // these are layers
        // i don't understand everything with their organisation...
        // this is the main group for all hexagons
        this.hexagon=game.add.group();

        this.hover=function (hexagon) {
            this.hexagon.forEach(function (hexagon) {

                hexagon.inputEnabled=true;

                hexagon.events.onInputOver.add(function(){
                    if(hexagon.on){hexagon.tint=0xCCCCCC}
                }, this);
                hexagon.events.onInputOut.add(function(){
                    hexagon.tint=0xffffff
                }, this);
            })
        },

        this.light=new Light(this.tools,this.hexagon);

        // et puis les autres bêtes
        
        // this.ipad=game.add.group();
        // this.regle=game.add.group();
        // this.menu=game.add.group();
        // this.grosseBarre=game.add.group()

        // this is the group of all sprites
        //on the board
        this.betes=game.add.group();

        // this.hexagon.add(this.betes);

        // this.menu.fixedToCamera = true;
        // this.menu.add(this.grosseBarre)

    };

    Groupes.prototype=Light;
    return Groupes;
    
})
