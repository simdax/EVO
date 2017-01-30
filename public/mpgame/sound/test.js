// var fs=require('fs')
// eval(fs.readFileSync("lang.js").toString())
// eval(fs.readFileSync("parse.js").toString())
// eval(fs.readFileSync("partition.js").toString())
// eval(fs.readFileSync("converter.js").toString())
// eval(fs.readFileSync("melodie.js").toString())

// lib support
//eval(fs.readFileSync("../lib/Tone.min.js").toString())

// this step transforms your part in dic whit "forme and voix" values
var z=new Part(b)
if (z) {
  console.log("ok");
  console.log(z);
}

inter=new Tone.CtrlPattern(["2n", "1m", "16n","16n"]);
z=new Tone.Pattern(function (t,n) {
console.log(n);
   z.interval=inter.next()
    console.log(z.interval);
},["C2", "D4", "E5", "A6"])

// this step transforms your dict-voix dictionaries with notes in them
//
// c=new Converter()
// l=[]
//
// ! function parser() {
//
//   for(var key in morceau) {
//     switch (key) {
//       case "voix":
//       break;
//       case "forme": // nothing
//       break;
//       default:
//       parser(morceau[key])
//
//       var f =[]
//       // transform each token in midi notes
//       morceau[key].voix.forEach(function (token,i,arr) {
//         console.log(token);
//         f.push(c.convert(token))
//       })
//       // regroup each token in one phrase
//       instrs.split(",").forEach(function (instr) {
//         l.push(new Melodie(f,morceau.tempus,instr))
//         console.log(l);
//         d= new Forme(l,forme)
//         console.log(d);
//       })
//     }
//   }
// }()
