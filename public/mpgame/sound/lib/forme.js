/*
███████  ██████  ██████  ███    ███ ███████
██      ██    ██ ██   ██ ████  ████ ██
█████   ██    ██ ██████  ██ ████ ██ █████
██      ██    ██ ██   ██ ██  ██  ██ ██
██       ██████  ██   ██ ██      ██ ███████
*/

//  take a string,
// and return an array of indices

convertStringToAscii=function (str) {
  var res=[];
  for (var i = 0; i < str.length; i++) {
    res.push(str[i].charCodeAt(0) - 97)
  }
return res
}

// some static functions
Forme.choose=function (forme) {
// TODO:
          return new Tone.CtrlPattern(forme)

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
    return val
    // return convertStringToAscii(val)
    break;
    default:
    break;
  }
};


function Forme(forme) {
  return Forme.choose(Forme.makeForme(forme));
}
