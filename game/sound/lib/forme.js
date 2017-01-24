
// A form take a string, an array
// and return an array of indices

// some static functions
Forme.choose=function (forme) {
      switch (forme) {
        case 'string':
          // something like randomWalk or randomOnce
          return new Tone.CtrlPattern(this.set,forme)
          break;
        default:
          // if its a dict
          return new Tone.CtrlMarkov(this.set,forme)
      }
  };
// function used to transform sumthing like "aaba" into indices (0010)
// 5 => 0,1,2,3,4
// "aabacd" => 0, 0, 1, 0 ,2 ,3
Forme.makeForme= function  (val) {
  switch (typeof val) {
    case 'number':
    return range(0,val-1)
    break;
    case 'string':
    return convertStringToAscii(val)
    break;
    default:
    break;
  }
};


function Forme(forme) {
  return Forme.choose(Forme.makeForme(forme))
}
