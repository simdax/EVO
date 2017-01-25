// globConverter= new ConvertMel();

Tone.Transport.start("+1")


//
// bach= new bob(null, null, synth);
// new Tone.Loop(function () {
//     var n=bach.formes.next();
//     bach.setForme(n)
// },"2m")//.start(0)
// //bach.play()


part1=function () {
    seq1= new Tone.Sequence(function(t,n){
        synth.triggerAttackRelease(n,0.25);
        duoSynth.triggerAttackRelease(n,0.5);
        snare.triggerAttackRelease(n,2)
    }, ["B3", ["B3","B3","B3"],"B3",["B3","B3","F#3"],"B4",["B4","B4","B4"],"B4",["B4","B4","F#4"]]).start(0);
    seq2=new Tone.Sequence(function(t,n){
        metal.triggerAttackRelease(0.25);
        snare.triggerAttackRelease(0.25)
    }, [["B3",null,"F#3"],"B4",["B4","B4","B4"]]).start(0);
    seq3=new Tone.Sequence(function(t,n){
        fmSynth.triggerAttackRelease(n,1)
    }, ["D4", "D#4"], "1m").start(0)
    seq4=new Tone.Sequence(function(t,n,f){
        synthBasse.triggerAttackRelease(n,t)
    }, [
        "B1", ["B2","C#3"],["D3","C#3"],["B4","F#4","D4"],["C#4","C#3"],
        null, ["B2","C#3"],["B4","F#4","G#3"],["A4","E#4"],"E#3"
    ], "1m").start("4m").cancel("4m"+"10m")
};

part2=function () {
    seq1.stop()
    seq2.stop();
    new Tone.Pattern(function(t,n){
        synth.triggerAttackRelease(n,0.25);
        duoSynth.triggerAttackRelease(n,0.5);
    }, ["F#5","A5","C#6","F#6","A6"],"upDown")
        .start(0)
};

new Tone.Part(function (t,f) {
    f.call()
},[[0,part1],["32m",part2]]).start(0)

//
// test = new Mel;
// function loopAI(){
//     test.loop();
//     if (test.phrases.length>0) {
//         var res=[];
//         for(var i = 0; i < test.phrases[0].length; i++) {
//             var t=test.phrases[0][i]+bach.mels[bach.forme][i];
//             res.push(t)
//         }
//         var ii=globConverter.convert(res)
//         var io=new Tone.Sequence(function (t,n) {
//             synth.triggerAttackRelease(n,0.5)
//         } ,ii, "4n");
//         //        io.loop=false
//         io.start(0)
//     }else{
//         setTimeout(loopAI,100)
//     }
// }
// //loopAI()
