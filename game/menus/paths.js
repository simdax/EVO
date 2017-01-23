
// grosse variable globale because que il faut reupdater les infos
//à chaque fois qu'un joueur a son tour a lui.
var couleursBouttons={}

var tweenBarreBas;

var especesIPAD=[
"annelides", "thons",
"mollusques", "seches", "insectes", "coelacanthes", "roussettes",
"pieuvres", "arachnides", "grenouilles", "requins",
"compsognathus", "crocodiles", "serpents", "rongeurs",
"tyrannosaures", "hippopotames", "gorilles", "orques"
]

var offset=[1520,475];
var posIPAD=[
//   [0,0], //centre/ le vaisseau,
 [-90,-20] ,[20, -20],
 [-150,-90] ,[-100, -90], [-40,-90], [18, -100],[90,-100],
 [-130,-180], [-50, -180], [20,-180] ,[90, -180],
 [-140,-250] ,[-70, -250] ,[10,-250] ,[80, -250],
 [-140,-330] ,[-60, -330] ,[20,-330], [80, -330]
 ]

 // même function de gros bourrin que dans "menus.js"
 function buyEsp(button){
      mdj.current().acheter(button.esp);
      button.tint=0x154251
      button.alpha=0.6
 }

function gosp () {
for (var i = 0; i < posIPAD.length; i++) {
    var pos=posIPAD[i];
      var sp=game.add.button(pos[0]+offset[0],pos[1]+offset[1],
        'hexagon',
        buyEsp);
      sp.esp=especesIPAD[i]
      sp.scale.setTo(0.5)
      sp.alpha=0.22
      sp.tint='#517865';
      regleGroup.add(sp)
}
}
