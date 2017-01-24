// wrapper for TONEJS sequence
// adds dur function
// adds link with a Timbre dict, that generates necessary synth ??
// plus a support for alternate notation like "harmonize x mel"

// it gives two abstraction => play and stop directly that acts to the synth
// and a 'dur' func that calculates

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
      console.log(timbre);œ
  };

}

// a great wrapper
Melodie = function (mel,synth,forme,res,loop=1) {
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
  this.seq=new Tone.Sequence(cb,mel);
  this.seq.iterations=loop;
  this.seq.interval=this.res=res;
}
Melodie.prototype={
  play:function (time) {
    this.seq.start(time)
  },
  stop:function (time) {
    this.seq.stop(time)
    this.synth.triggerRelease(time)
  },
  // toggle is for reset
  toggle:function () {
    if (this.seq.state=='stopped') {
      this.start()
    }else{this.stop()}
  },
  dur:function () {
      return Tone.TimeBase(this.seq.subdivision).mult(this.seq.length + '').mult(this.seq.iterations)
  }
}

// a player is a melodie reader that loops.
//Player
