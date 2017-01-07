

var mel, morceau, note, play, root, rythme, scale;
var indexM, indexR, index;


function convertMidi(midi) {
    return Math.pow(2, (midi-69)/12) * 440
}
function addAll(ar,nb) {
    for(var i = 0; i < ar.length; i++) {
        ar[i]+nb
    }
}

root = 60;
scale = [0, 2, 4, 5, 7, 9, 11, 12];
mel = [0, 3, 4, 3, 1, 2, 3, 2, 1];
rythme = [1, 1, 2];

morceau = {
    root: root,
    mel: mel,
    rythme: rythme,
    scale: scale,
    play: play,
    synth: synth
};

index=0
indexM =0;
indexR =0;

note = function(note, scale, root) {
    var octave;
    octave = 0;
    if (note > scale.length) {
        note = note % scale.length;
        octave = note / scale.length;
    }
    return root + scale[note] + (octave*7) * scale.length;
};

morceau.play = function() {

    var delay=0;
    var r1,r2;
    var n1,n2;

    if (indexR === morceau.rythme.length) {
        indexR = 0;
    };
    if (indexM === morceau.mel.length) {
        indexM = 0;
    };
    
    r1 = morceau.rythme[indexR];
    n1 = note(morceau.mel[indexM], morceau.scale, morceau.root);

    r2 = r1;
    n2 = note(morceau.mel[indexM+2], morceau.scale, morceau.root);
    
    morceau.synth.triggerAttackRelease(convertMidi(n1), r1*0.95);
    morceau.synth.triggerAttackRelease(convertMidi(n1), r1*0.95);

    // main
    morceau.synth.triggerAttackRelease(convertMidi(n2), r2*0.95);
    setTimeout(morceau.play, r1*1000);
    
    indexM += 1;
    indexR += 1;

};

// morceau.play()
