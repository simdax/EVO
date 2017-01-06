synth = new Tone.PolySynth(4, Tone.synth, {
    "oscillator" : {
	"type" : "square"
    },
    "envelope" : {
	"attack" : 0.01,
	"decay" : 0.2,
	"sustain" : 0.2,
	"release" : 0.2,
    }
}).toMaster();
