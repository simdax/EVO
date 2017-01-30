var Game =function (phaser,seed,id,nb) {

this.id=id;

  this.board= new Board(phaser,seed,id,nb);

  phaser.state.add("board", this.board);
  phaser.state.start("board");

  // we create the map with the seed

};

Game.prototype={

  // server communication
  socketCommunication:function(){
    evo.socket.on('changeTurn',function () {
      console.log("next");
      this.board.mdj.nextAlone()
    });
    evo.socket.on('deleteMarker',function (id) {
      ids[id].meurt()
    });
    evo.socket.on('movePion',function (id,pos) {
      ids[pion.id].go(pos[0],pos[1])
    })
    evo.socket.on('newMarkerAt',function(infos) {
        console.log("on reçoit un truc ??");
      console.log(infos.image); console.log(infos.joueur); console.log(infos.pos);
      var pion=new marker(infos.image,infos.joueur).go(infos.pos[0],infos.pos[1])
      console.log(ids);
    })
  },

  start: function() {

    var callback=function () {
      var pion=this.board.mdj.joueur.vaisseau;
      if (pion.landing) {  }
      else{
        this.board.game.input.onDown.remove(callback,this)
        this.board.groupes.hexagon.setAll('alpha', 1);
        this.board.mdj.next(); // et go !
      }
    };

    // init vaisseau
    this.board.mdj.joueur.vaisseau = marker("vaisseau",this.board.mdj.joueur);
    this.board.mdj.joueur.vaisseau.land();
    this.board.groupes.hexagon.setAll('alpha', 0.65);
    this.board.game.input.onDown.add(callback,this);

  },


};
