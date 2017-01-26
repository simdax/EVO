Player = function (arg) {
    this.mel = new Mel;
    this.player= new bob;
};

Player.prototype={
    loop:function () {
        this.mel.loop();
        if (this.mel.hasMel()) {
            var t=this.mutate();
        }
    },
    mutate:function () {
        
    },
    
}
