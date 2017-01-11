
Melodie = function (synth,mels) {
    this.seq=new Tone.Sequence;
    this.callback=function (t,n) {
        console.log(n);
        synth.triggerAttackRelease(t,0.2)
    };
    this.converter = new ConvertMel
}

ConvertMel= function (root,scale,octave) {
    this.octave = octave || 5;
    this.root = root || 0;
    this.scale = scale ||  [0,2,4,5,9,11,12];
};
ConvertMel.prototype={
    convert:function (m,root) {
        var mel=[];
        for(var i = 0; i < m.length; i++) {
            if (m[i]===null) {
                mel.push(null)
            }else if(m[i]==="s"){
                mel.push("s")
            }else{
                var octave=this.octave;
                var index=m[i];
                if (index>=this.scale.length) {
                    octave=Math.floor(index/this.scale.length);
                    index=index%this.scale.length; 
                };
                mel.push(Tone.Frequency(
                    this.root+(this.scale[index])+(12*octave),"midi").toNote()                       )}
        };
        return mel
    }
};

