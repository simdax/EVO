define(['board'], function(Board) {
    
    return Game=function (phaser,seed,id,nb) {

        this.id=id;
        this.phaser=phaser;

        this.states={}; // TODO: add more states ?
        this.board= new Board(phaser,seed,id,nb);

        phaser.state.add("board", this.board);
        phaser.state.start("board");

        // we create the map with the seed

    };

})
