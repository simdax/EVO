var mels={
    a:[null,0,1,2,3,1,2,0],
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
                console.log([index,octave]);
                mel.push(Tone.Frequency(
                    this.root+(this.scale[index])+(12*octave),
                    "midi").toNote()
                        )
            }
        };
        console.log(mel);
        return mel},
    play:function() {
        forme= new Tone.CtrlMarkov({
            "a": ["a","b"],
            "b": ["a","b"],
        });
        var mm={};
        for(var mel in mels){
            console.log(mels[mel]);
            mm[mel]=this.convert(mels[mel])
        }
        var callback=function (t,n) {
            synth.triggerAttackRelease(n,0.25)
        };
        var setMel=function (mel) {
            console.log(mel);
            for(var i = 0; i < mel.length; i++) {
                seq.add(i, mel[i])
            }
        };

        var seq=new Tone.Sequence(callback,mm.a,"8n");
        seq.start(0);

        var loop=new Tone.Loop(function () {
            var next=forme.next();
            setMel(mm[next]);
        }, "2m");
        loop.start("2m")


    }
}

bach= new bob(synth);
bach.play()
