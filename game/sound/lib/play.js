// wrapper for tonejs pattern

// a part is a form.

// extends Pattern with 

var Player= function (dict) {
  //dict
  this.dict=dict
  this.count=-1;
  //forme
  this.forme=Forme(this.dict.forme)
  // and we go on
  delete this.dict.forme;
}
Player.prototype={
  play:function () {
    // bourrin callback => arrête tout et joue ce qu'il faut
    var cb=function () {
      this.stop();
      // next call next in forme
      this.next().forEach(function(mel) {
        // mel can be a simple "mel", or a "part", so "play" is a polymorphic function
        mel.play()
      }.bind(this));
    }.bind(this);
    Tone.Transport.schedule(cb)
  },
  stop:function () {
    // hard stop
    for(var mel in this.dict){
      mel.stop()
    }
  },
  next:function (part) {
    // go counter
    this.count += 1
    // if part is specified, go for it
    if (part < this.dict.length) {
      return this.dict[this.forme[part]]
    }else{
      // else
      // returns the mel in dict at index according to forme pattern...
      if (this.forme.next) {
        var res=[];
        this.forme.value.forEach(function (el) {
         res.push(this.dict[el])
       }.bind(this))
        //  ... that we increment
        this.forme.next()
        return res
      }else{
        // or go straigth ahead
        this.count-=1; return this.next(this.count%this.dict.length)
      }
    }
  }
}
