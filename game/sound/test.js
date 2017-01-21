// var fs=require('fs')
// eval(fs.readFileSync("lang.js").toString())
// eval(fs.readFileSync("parse.js").toString())
// eval(fs.readFileSync("partition.js").toString())
// eval(fs.readFileSync("converter.js").toString())
// eval(fs.readFileSync("melodie.js").toString())

// lib support
//eval(fs.readFileSync("../lib/Tone.min.js").toString())


b=new Parser(a)
if (b) {
  console.log("ok");
  console.log(b);
  console.log(b.voix);
}

// todo root....
c=new Converter()
l=[]
for(var instrs in b.voix) {
  var f =[]
  // transform each token in midi notes
  b.voix[instrs].forEach(function (token,i,arr) {
    console.log(token);
    f.push(c.convert(token))
    })
  // regroup each token in one phrase
      instrs.split(",").forEach(function (instr) {
           l.push(new Melodie(f,b.tempus,instr))
    })
 }

console.log(l);
d= new Part(l,b.forme)
console.log(d);
