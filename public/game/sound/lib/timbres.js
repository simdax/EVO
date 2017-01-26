/*
████████ ██ ███    ███ ██████  ██████  ███████
   ██    ██ ████  ████ ██   ██ ██   ██ ██
   ██    ██ ██ ████ ██ ██████  ██████  █████
   ██    ██ ██  ██  ██ ██   ██ ██   ██ ██
   ██    ██ ██      ██ ██████  ██   ██ ███████
*/



// TODO: more warning :!!!!
// TODO: pre-defined envelopes ??


// generates a MonoSynth
// from a simple string

// ex:
// "sine2:perc:notch3"


function Timbre(string) {
  return Lexer.check(string)
}

// lexer
// take a string of type "type[a,r,g,s][e,t,c]"
Lexer={
  check:function (str) {
    if(Lexer.detectType(str)){ // if true, means do not parse
      if (Timbres[str]) {
        return Timbres[str]
      }else{ // really means nothing
        console.log("nothing found, sorry : "+str);
        return str
      }
    }else{
      return Lexer.parse(str)
    }
  },
  detectType:function (str) {
    /// moui
    return  str.match(":") == null
  },
  // here a simple lexer function
  parse: function (str) {
    // TODO: if not match, look at globDict, else return it as label
    // match inner bracket regexp
    // the check step
    res={}
    var cut=  str.split(":") //=> base words : osc adsr filter
    cut.forEach((str,i)=>{
      var parseOrder=["oscillator","envelope","filter"][i];
      res[parseOrder]=Lexer.parseArgs(parseOrder,Lexer.cutTypeArg(str))
    })
    return new Tone.MonoSynth(res)
  },
  cutTypeArg: function (str) {
    // and feed with inner brackets
    var rx1 = /\[([^\]]+)]/g;
    var res=str.split(rx1).filter(Boolean);
    // TODO: have to see if split regexp function
    var i=0; if(res.length>1){i=1}
    for (; i < res.length; i++) {
      res[i]=res[i].split(",").map((el)=>{return Number(el)})
    }
    return res
  },
  dict: {
     oscillator:["type","partials"],
     envelope:["attack","decay","sustain","release"],
     filter:["type","frequency"]
   },
parseArgs:function(type,args){
  var res={};
  if (type=="envelope") {
    if(args[0]){args=args[0]}
  }
  args.forEach((arg,i)=>{
    res[Lexer.dict[type][i]] = arg
  });
  return res
}
}

// here are some prefact Env
// TODO: not implemented

Envelopes={
  0:{
    "attack":0.1,
    "decay":0.1,
  },
  1:{
    "attack":0.2,
    "decay":0.5,
  },
  2:{
    "attack":0.5,
    "decay":0.1,
  }
}

// here is some additional prefacu timbre that you can use, as is


Timbres={
  accords:new Tone.PolySynth(3,Tone.Synth, {
    "volume":-10,
    "oscillator":{
      "type":"sine",
      //      "partials":[0,1,3,4,6,7,9,10]
    },
    "envelope":{
      "attack": 0.1,
      "decay":  0.1,
      "sustain":  1,
      "release": 0.2,
    }
  }).toMaster(),
  metal:new Tone.MetalSynth({volume:-30}).toMaster(),
  snare:new Tone.NoiseSynth({volume:10}).toMaster(),
  synthBasse:new Tone.Synth({
    "volume":-10,
    "oscillator":{
      "type":"sawtooth"
    },
    "envelope":{
      "attack": 0.1,
      "decay":  0.1,
      "sustain":  1,
      "release": 0.2,
    }
  }).toMaster(),
  synth: new Tone.Synth({
    "volume":-15,
    "oscillator" : {
      "type" : "sawtooth8"
    },
    "envelope" : {
      "attack" : 0.1,
      "decay" : 0.2,
      "sustain" : 0.2,
      "release" : 0.2,
    }
  }).toMaster(),
  snare: new Tone.MembraneSynth({
    volume:-5,
    octaves:3,
    pitchDecay:0.5
  }).toMaster(),
  fmSynth: new Tone.FMSynth({
    "volume":-7,
    "oscillator": {
      "type": "sine"
    },
    "modulation":{
      "type": "sine"
    },
    "modulationEnvelope":{
      "attack":0.1,
      "decay":0.2,
      "sustain":1,
      "release":0.2
    }
  }).toMaster(),
  duoSynth: new Tone.DuoSynth({
    volume:-10,
    vibratoAmount:0.5,
    vibratoRate:5,
    harmonicity:1.5,
    voice0:{
      volume:-10,
      portamento:0,
      oscillator:{
        type:"sine"
      },
      filterEnvelope:{
        attack:0.01,
        decay:0,
        sustain:1,
        release:0.5,
      },
      envelope:{
        attack:0.01,
        decay:0,
        sustain:1,
        release:0.5,
      }
    },
    voice1:{
      volume:-10,
      portamento:0,
      oscillator:{
        type:"sine4"
      },
      filterEnvelope:{
        attack:0.01,
        decay:0,
        sustain:1,
        release:0.5
      },
      envelope:{
        attack:0.01,
        decay:0,
        sustain:1,
        release:0.5
      }
    }
  }).toMaster()
}
