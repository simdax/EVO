// server communication


GameCallbacks=function(socket,game){

  this.socket=socket;
  this.game=game;

  this.init=function (state) {
    for(var key in this.dict[state]){
      this.socket.on(key,function (args) {
        this.parseArgs(state,key,args)
      }.bind(this))
    }
  };

}

GameCallbacks.prototype={

  // we receive infos in block
  parseArgs:function (state,key,blockArgs) {
    this.dict[state][key].apply(this.game[state],blockArgs)
  },
  dict:{
    board: {
      changeTurn:function () {
        this.mdj.nextAlone()
      },
      deleteMarker:function (idJoueur,idbete) {
        this.mdj.joueurs[idJoueur].grp[idbete].meurt()
      },
      moveMarker:function (idJoueur,idbete,pos) {
        this.mdj.joueurs[idJoueur].grp[idbete].collider.go(pos[0],pos[1])
      },
      newMarkerAt:function(image,joueur,pos) {
        console.log(arguments);
        var pion=this.mdj.joueurs[joueur].newMarker(image)
        pion.collider.go(pos[0],pos[1]);
        pion.setId();
        return pion
      }
    }
  }
};
