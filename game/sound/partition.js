
function override (d1,d2) {
  var copy=clone(d1);
  for(var k in d2)  { copy[k]=d2[k]}
  return copy
};

a={
  scale:[0,2,3,5,7,8,10],
  key:"-1",
  tempus:"1m",
  "bob":{
    key:"2",
    "synthBasse":"000 ~~~123 000"
  },
  "synthBasse":
  `
  0,
  01 21 742 11  ~
  01 21 745 63  3
  `,
  acc:{
  "synth3,duoSynth3,snare3":
  `
  0 000 0 004
  7 777 7 774
  `,
  "fmSynth3":
  "2 2+",
  "metal,snare":
  `
  x~x x   xxx
  xxx xxx xxx
  `},
}

b={
  forme:"ab",//{a:"aa",aa:"b",b:"a"},
  a:a,
  b:override(a,{key:'c', scale:[0,2,4,5,7,9,11]})
}
