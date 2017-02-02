
var Game =function (phaser,seed,id,nb) {

    this.id=id;
    this.phaser=phaser;

    this.states={}; // TODO: add more states ?
    this.board= new Board(phaser,seed,id,nb);

    phaser.state.add("board", this.board);
    phaser.state.start("board");

  // we create the map with the seed

};

Game.prototype={

  start: function() {

    var callback=function () {
      var pion=this.board.mdj.toi.vaisseau;
      if (pion.landing) {  }
      else{
        this.board.game.input.onDown.remove(callback,this)
        this.board.groupes.hexagon.setAll('alpha', 1);
        this.board.mdj.next(); // et go !
      }
    };
    // init vaisseau

    this.board.mdj.toi.vaisseau = marker("vaisseau",this.board.mdj.toi);
    this.board.mdj.toi.vaisseau.land();
    this.board.groupes.hexagon.setAll('alpha', 0.65);
    this.board.game.input.onDown.add(callback,this);
  },


};
