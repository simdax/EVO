/*
 ██████  ██████  ███    ██ ██    ██ ███████ ██████  ████████ ███████ ██████
██      ██    ██ ████   ██ ██    ██ ██      ██   ██    ██    ██      ██   ██
██      ██    ██ ██ ██  ██ ██    ██ █████   ██████     ██    █████   ██████
██      ██    ██ ██  ██ ██  ██  ██  ██      ██   ██    ██    ██      ██   ██
 ██████  ██████  ██   ████   ████   ███████ ██   ██    ██    ███████ ██   ██
*/

// a converter is something that takes some numbers and transform them in
// notes.

// it has functions to adapt notes with harmony, and can somewhat improvise
// with finding notes function.

// dic for converting non numeric information in the partition
var dictionary={
  s:function () {
    console.log("salut les loulous");
  },
  x:40
}

Converter= function (root,octave,detune,scale,strict) {
  this.root = root || 0;
  this.octave = octave || 5;
  this.detune = detune || 0;
  this.scale = scale ||  [0,2,4,5,7,9,11];
  // ok, ça c'est juste pour dire la quinte est "sol" et pas "la"
  this.strict=strict || 1
  this.lexer= dictionary
};
Converter.prototype={
  // something cool with music theory later...
  transpo:function (token,note) {
    var t={"\'":7, ',':-7, '+':2, '*':5, '-':-2, '/': -5}[token];
    var change;
    return t
  },
  convert:function (tokensArray) {
    var mel=[];
    for(var i = 0; i < tokensArray.length; i++) {
      //silence
      if (tokensArray[i]==="~") {
        mel.push(null)
      }
      // a token
      else if(isNaN(tokensArray[i][0])){
        // here we should have a dictionary of SYMBOLS : CALLBACK
        var gram=this.lexer[tokensArray[i]]
        if (gram) {
          mel.push(gram)
        }
      }else
      // a digit = a note
      {
        var octave=this.octave;
        var index=Number(tokensArray[i][0]);
        // wrap around scale
        if (index>=this.scale.length) {
          octave=octave+Math.floor(index/this.scale.length);
          index=index%this.scale.length;
        };
        // transpo
        var transpo; if (tokensArray[i][1]) {
          transpo=this.transpo(tokensArray[i][1],index)
        }else{transpo=0};
        // et on push
        mel.push(
          Tone.Frequency(
            this.root+(this.scale[index+transpo]+this.detune)+(12*octave)
            ,"midi").toNote()
          )
        }
        }
        return mel
      }
    };
