// wrapper for TONEJS sequence
// adds dur function
// adds link with a Timbre dict, that generates necessary synth ??
// plus a support for alternate notation like "harmonize x mel"

// goes with a timbre dictionary
// we should go for process synth here...
function findTimbre(timbre) {
  // en attendant
  return timbre.replace(/\d/g,'');

// TODO
  findDig=timbre.match(/\d/);
  if(findDig.index) {
    // here go for timbre generation...
  }

          // check timbres
  if (Timbres[timbre]) {
    console.log("ok pour");
      console.log(timbre);
  }else{
    console.log("pas de timbre pour ");
      console.log(timbre);
  };

}



Melodie = function (mel,dur,synth) {
  this.synth=Timbres[findTimbre(synth)];
// callback pour la sequence
  // lit une note, ou execute une fonction spécifique (TODO)
  var cb=function (t,n) {
    console.log(n);
    if (isFunction(n)) {
      n.call(this)
    }else {
      this.synth.triggerAttackRelease(n,t)
    }
  }.bind(this);
  this.seq=new Tone.Sequence(cb,mel,dur);
}
Melodie.prototype={
  start:  function (time) {
    this.seq.start(time)
  },
  stop:function (time) {
    this.seq.stop(time)
    this.synth.triggerRelease(time)
  },
  dur:function () {
      return Tone.TimeBase(this.seq.subdivision).mult(this.seq.length + '')
  }
}
