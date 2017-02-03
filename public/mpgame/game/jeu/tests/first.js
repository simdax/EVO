
describe('a board',function(){
    var a=Board;
    it('should exists',function(){
        a.not.toBeNull()
    })
    it('should have one mdj and many players',function(){
        a.mdj.toBeDefined();
        a.players.toBeDefined();
    });
});

describe('a player',function(){
    var a=new Player();
    it('should create marker',function(){
        a.marker.not.toThrow
    })

})
describe('a game',function() {

    var evo;var game; var go; var ga;

    beforeEach(function(){
        evo={id:0, socket:{on:function () {}, emit:function () {}}};
	///// GOOOOO
	game = new Phaser.Game(1400, 1000, Phaser.AUTO);
	go = new Game(game,0,0,2);
        ga=new GameCallbacks(evo.socket,go.board)
    })
    // afterEach()'

    it('should exists !',function () {
        ga.toBe(true) 
    });
    it('should have players, seed and ?',function() {
        expect(a.players).toBe(true)
        expect(a.seed).toBe(true)
        //        expect(a.).toBe(true)
    });
});
