
ConvertMel=function(root,scale) {
    this.root=root || 60;
    this.scale=scale || [0,2,4,5,9,11,12]
}; 
ConvertMel.prototype={
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
                    this.root+(this.scale[index])+(12*octave),"midi").toNote()
                        )}
        };
        return mel
    }
};

function melange(n,r) {
    var res=[];
    for(var i = 0; i < n.length; i++) {
        res.push([n[i],r[i]])
    };
    return res
}


bob=function (mels, forme, timbre) {
    this.converter=new ConvertMel();
    this.mm={};
    this.mels= mels || {
        a:[7,0,1,2,3,1,2,0],
        b:[5,4,3,2,1,3,2,4],
        c:[3,2,1,0,2,1,3,2],
    };
    this.timbre=timbre || t;
    this.formes= new Tone.CtrlMarkov( forme || {
        "a": ["a","b","c"],
        "b": ["a","b","c"],
        "c": ["a","b","c"],
    }); 
    //setup
    for(var mel in this.mels){
        this.mm[mel]=this.converter.convert(this.mels[mel])
    };
    var callback=function (t,n) {
        synth.triggerAttackRelease(n,0.5)
    };
    this.seq= new Tone.Sequence(callback,new Array(8));
};
bob.prototype={
    setForme: function(i) {
        var m=this.mm[i];
        for(var i = 0; i < m.length; i++) {
            this.seq.at(i, m[i])
            console.log(m[i]);
        };
        console.log("forme settée");
    },
    play:function () {
        this.seq.start(0)
    }
}


