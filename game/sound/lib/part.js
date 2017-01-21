// wrapper for tonejs pattern

// a part take a dictionary of mel that he plays according
// a form aka an array of indices

// its like TONE pattern, except it waits for the end of a melody
// to go up

var Part= function (dict,set,forme,depart) {
  this.count=-1;
  this.dict=dict;
  this.set=set || makeForme(Object.keys(dict).length)
  this.forme= new Tone.CtrlPattern(this.set,forme);
  this.mel=this.dict[depart||0]
  // recursive callback function
  // play a mel, and trigger next mel after the first is finished
  this.cb=function (time) {
    console.log("gogo");
       this.mel.stop()
       this.mel=this.next();
       this.mel.start(0);
       this.id=Tone.Transport.schedule(this.cb,Tone.Time().addNow().add(this.mel.dur()))
  }.bind(this)
}
Part.prototype={
  start:function () {
    // lets play callback
      Tone.Transport.schedule(this.cb)
  },
  stop:function () {
    this.mel.stop();
    if (this.id) {
      Tone.Transport.clear(this.id)
    }
  },
  next:function (part) {
    // go counter
    this.count += 1 // for now, pure information
    // if part is specified, go for it
    if (part < this.dict.length) {
      return this.dict[this.forme[part]]
    }else{
    // returns the mel in dict at index according to forme pattern...
    var res=this.dict[this.forme.value]
    //  ... that we increment
    this.forme.next()
    return res
  }
}
}
