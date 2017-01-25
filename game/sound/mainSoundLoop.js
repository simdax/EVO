
part1=function () {
    seq1= new Tone.Sequence(function(t,n){
        Timbres.synth.triggerAttackRelease(n,0.25);
        Timbres.duoSynth.triggerAttackRelease(n,0.5);
        Timbres.snare.triggerAttackRelease(n,2)
    }, ["B3", ["B3","B3","B3"],"B3",["B3","B3","F#3"],"B4",["B4","B4","B4"],"B4",["B4","B4","F#4"]]).start(0);
    seq2=new Tone.Sequence(function(t,n){
        Timbres.metal.triggerAttackRelease(0.25);
        Timbres.snare.triggerAttackRelease(0.25)
    }, [["B3",null,"F#3"],"B4",["B4","B4","B4"]]).start(0);
    seq3=new Tone.Sequence(function(t,n){
        Timbres.fmSynth.triggerAttackRelease(n,1)
    }, ["D4", "D#4"], "1m").start(0)
    seq4=new Tone.Sequence(function(t,n,f){
        Timbres.synthBasse.triggerAttackRelease(n,t)
    }, [
        "B1", ["B2","C#3"],["D3","C#3"],["B4","F#4","D4"],["C#4","C#3"],
        null, ["B2","C#3"],["B4","F#4","G#3"],["A4","E#4"],"E#3"
    ], "1m").start("4m").cancel("4m"+"10m")
};

var arpeg;
part2=function () {
    seq1.stop()
    seq2.stop();
    arpeg=new Tone.Pattern(function(t,n){
        Timbres.synth.triggerAttackRelease(n,0.25);
        Timbres.duoSynth.triggerAttackRelease(n,0.5);
    }, ["F#5","A5","C#6","F#6","A6"],"upDown")
        .start(0)
};
// marche pas ??
part3=function () {
  console.log("hello beach");
  arpeg.stop()
  console.log(arpeg);
  musique.play()
}


/// original loop
var originalLoop=new Tone.Part(function (t,f) {
  console.log("beuh ?");
    f.call()
},[[0,part1],["32m",part2]])
