// bip= new Tone.Player({
//     "url" : "./sound/mp3/button.mp3"
// }).toMaster()



accords=new Tone.PolySynth(3,Tone.Synth, {
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
}).toMaster();
metal=new Tone.MetalSynth({volume:-30}).toMaster();
snare=new Tone.NoiseSynth({volume:10}).toMaster();

synthBasse2=new Tone.Synth( {
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
}).toMaster();
synthBasse=new Tone.Synth({
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
}).toMaster();

synth = new Tone.Synth({
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
}).toMaster();

snare= new Tone.MembraneSynth({
    volume:-5,
    octaves:3,
    pitchDecay:0.5
}).toMaster();

fmSynth= new Tone.FMSynth({
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
}).toMaster();


duoSynth= new Tone.DuoSynth({
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
