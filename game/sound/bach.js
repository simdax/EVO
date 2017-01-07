var mels={
    a:[7,0,1,2,3,1,2,0],
    b:[5,6,7,8, 8,9,4,3,1],
};
bob=function (t) {
    this.timbre=t;
    Tone.Transport.start();
};
bob.prototype={
    root:60,
    scale:[0,2,4,5,9,11,12],
    b:[-3,-2,-2,-2],
    parcours:[0,4,],
    convert:function (m) {
        var mel=[];
        for(var i = 0; i < m.length; i++) {
            if (m[i]===null) {
                mel.push(null)
            }else{
                var octave=0;
                var index=m[i];
                if (index>=this.scale.length) {
                    octave=Math.floor(index/this.scale.length);
                    index=index%this.scale.length; 
                };
                mel.push(Tone.Frequency(
                    this.root+(this.scale[index])+(12*octave),
                    "midi").toNote()
                        )
            }
        };
        return mel},
    play:function() {
        forme= new Tone.CtrlMarkov({
            "a": ["a","b"],
            "b": ["a","b"],
        });
        var mm={};
        for(var mel in mels){
            mm[mel]=this.convert(mels[mel])
        }
        var callback=function (t,n) {
            synth.triggerAttackRelease(n,0.25)
        };
        var setMel=function (mel) {
            for(var i = 0; i < mel.length; i++) {
                seq.at(i, mel[i])
            };

        };
        function setForme() {
            var next=forme.next();
            var m = mm[next];
            setMel(m);
        }
        new Tone.Loop(function () {
            setForme()
        },"1m").start(0);
        
        var seq=new Tone.Sequence(callback,mm.a,"8n");
        seq.start(0);

    }
}

bach= new bob(synth);
bach.play()
