
function overrideXwithY (d1,d2) {
  var copy=clone(d1);
  for(var k in d2)  { copy[k]=d2[k]}
  return copy
};

a={
  scale:[0,2,3,5,7,8,10],
  key:"2",
  tempus:"4n",
  octave:3,
  "bob":{
    key:2,
    "fmsawtooth6[1,2,3,2,3,1]:[0.1,0.1]": "000 ~~~123 000"
  },
  "synthBasse":`
  0,
  01 21 742 11  ~
  01 21 745 63+ 3+
  `,
  acc:{
    octave:3,
    "synth;duoSynth;snare":`
    0 000 0 004
    7 777 7 774
    `,
    "fmSynth":
    "2 2+",
    "metal;snare":`
    x~x x   xxx
    xxx xxx xxx
    `
  },
}

  c={
    scale:[0,2,3,5,7,8,10],
    key:"2",
    tempus:"2m",
    "bob":{
      key:"2",
      "synthBasse":"000 ~~~123 000"
    },
    "synthBasse":`
    0,
    01 41 7526 121  ~
    01 45 745 6321  3
    `,
    acc:{
      "synth;duoSynth;snare":`
      0 00 0 04
      7 77 7 74
      `,
      "fmSynth":
      "2 2+",
      "metal;snare":`
      x~x x   xx
      xx xx x
      `},
    }
