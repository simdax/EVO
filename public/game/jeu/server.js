// server communication
GameCallbacks=function(socket,state){

    this.socket=socket;

    // for socket
    // this.init=function (state) {
    // for(var key in this.dict[state]){
    //     this.socket.on(key,function (args) {
    //         this.parseArgs(state,key,args)
    //     }.bind(this))
    // };

    for(var key in this.board){
        this[key]=this.board[key].bind(state)
    }

};

GameCallbacks.prototype={
    // we receive infos in block
    parseArgs:function (state,key,blockArgs) {
        this.dict[state][key].apply(this.game[state],blockArgs)
    },
    board:{
        start: function() {
            var callback=function () {
                var pion=this.mdj.toi.vaisseau;
                if (pion.landing) {  }
                else{
                    this.game.input.onDown.remove(callback,this)
                    this.groupes.hexagon.setAll('alpha', 1);
                    this.mdj.next(); // et go !
                }
            };
            // init vaisseau
            this.mdj.toi.vaisseau = marker("vaisseau",this.mdj.toi);
            this.mdj.toi.vaisseau.land();
            this.groupes.hexagon.setAll('alpha', 0.65);
            this.game.input.onDown.add(callback,this);
        },
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
};
