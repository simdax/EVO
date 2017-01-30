/*
██████   █████  ██████  ███████ ███████
██   ██ ██   ██ ██   ██ ██      ██
██████  ███████ ██████  ███████ █████
██      ██   ██ ██   ██      ██ ██
██      ██   ██ ██   ██ ███████ ███████
*/


// conceptus :

// une melodie est un dictionnaire dont la seule clef vraiment importante
// est une clef "voix". la clef "voix" doit contenir un array de mots, ces mots étant eux mêmes
// un array de chiffres qui représente chacun la même valeur de durée, delayé par le nombre de notes
// dans l'array.
//  EXEMPLE : 0 01 23 0 ====> DO blanche DO RÉ noires MI FA noires DO blanche



// les autres clefs servent à donner des informations, tempo, tona etc.
// elles modifient donc globalement les notes
// ces clefs forment les "mots réservés" de la partition

// la clef voix est elle même un dictionnaire ou les keys-val sont
// timbre (synth) => séquence de notes

// quand un dictionnaire est parsé, il peut ne pas posséder de clefs voix. Ce sont toutes les
// autres clefs "non-réservées" qui serviront à peupler une valeur "voix" créées par le parser
//
// NON  partition = { tona... scale... tempo....     ....   voix : { synt1:"000 111",synt2: "111 222"} etc.}
// OUI  partition = { tona... scale... tempo....     ....   synt1:"000 111",synt2: "111 222" etc.}

// le parser descend dans le morceau jusqu'à rencontrer ces "autres clefs".
// ces autres clefs peuvent elles aussi contenir des informations "réservées" (tona, tempo etc.)
// qui écraseront les valeurs du header initial
// en revanche, si on se trouve dans un dictionnaire nesté, il devient nécessaire de préciser la valeur
// mel, la valeur timbre étant automatiquement donnée à la clef du dictionnaire
// par ex,
// partition = { tona... scale... tempo... ....   synt1:{tona... scale..., mel:"000 111"} }

//Pour résumer, dans l'idée, une partie musicale est résumé dans le dictionnaire defaultEvent
// quand on la parse, la clef 'voix' peut servir de porte à un arbre d'autres parties

//
///FORME ______________

// !!!!succesive
// succesness is expressed with letters

// if cap real forme
// if min => markov => random weight
// if numbers =>simultané
//
// => "aab" means 2x luckier a than b
// => AAB  means cycle over a , a , b then a, a, etc.
// you can concatenate both like in AAbbcA

// !!!! simultanées
// is expressed with numbers

// CLEFS DE TIMBRE ________________
// if ";" it means, separatly
// if "," it means, together

// ALGO de parsing ________________

// PARSE (dic,header = defaultHeader)
// k = keys de dic
//   for (k)
//   si k= mots réservés, remplace les valeurs de header;
//   for (k) // autres clefs
//   pour chaque autreKeys
//       si k==dic => PARSE(dic,header)
//       else if k ==string ANALYSE(k)

// the default event
defaultEvent=function(){
  this.tempus="1m";
  this.transpo=0;
  this.key=0;
  this.scale=[0,2,4,5,7,9,11];
  this.octave=5;
  this.forme="up";
  //  this.voix={"synth":"0"}        //  you better have to populate the two last !
}

// mots réservés
var reservedWords=Object.keys(new defaultEvent),

Part = function (JSON) {
  // les mots réservés
  this.init(JSON)
}

Part.prototype={
  do:function (cb,minus=[],dict=this) { // => all minus
    var thisKeys=Object.keys(dict);
    thisKeys.forEach(function(k){
      if(!reservedWords.includes(k) && !minus.includes(k) && k!="forme")
      {cb.call(dict,dict[k])}
    }.bind(dict))
  },
  init: function (JSON){
    // this header will be used when parsing with Converter
    if(JSON.forme){this.forme=Forme(JSON.forme)};

    var header={};
    for(var i = 0; i < reservedWords.length; i++) {
      if (JSON[reservedWords[i]]) {
        header[reservedWords[i]]=JSON[reservedWords[i]];
        // we delete to not reparse these keys
        delete JSON[reservedWords[i]]
      }
    }
    for(key in JSON) {
      if (typeof JSON[key] == 'string') {
        // 'string' here means
        // it's a form or a mel
        this[key]=this.parse(JSON[key],header); // we put info in "voix"
        // and then we convert into mel
        // we split for ', separated' keys
        key.split(";").forEach(function (instr) {
          this[instr]=new Melodie(this[key],instr,JSON.forme,header.tempus)
        }.bind(this))
        // and if it is the case, we destroy the primitive ","separated key
        if (key.match(/;/)) { delete this[key]  }
      }else{
        // else, means another parser object
        //we populate its header with ancien header
        var json=JSON[key];
        delete header.forme;
        for(var k in header){
          if (!json[k]) {
            json[k]=header[k]
          }
        };
        // and go for parsing
        this[key]=new Part(json)
      }
    }
  },
  parse:function (string,header={}) {
    // TODO if string ==> forme
    var mots=[]
    // get each lines and remove empty lines
    string.split("\n").filter(Boolean)
    // and for each
    .forEach(function (ligne) {
      // découpe la ligne en mots
      var l=ligne.split(/\s+/).filter(Boolean)
      l.forEach(function (mot) {
        // decoupe le mot en
        // nombres ou signe ~ ou x
        // avec optionellement plusieurs + ou -
        // avec optionellement plusieurs + ou -
        var match=mot.match(/[\d~x]([-+]+)?/g)
        mots.push(match)
      })
    });
    // ensuite on convertit les tokens
    var res=[];

    // do not forget the cast !!!
    var c=new Converter(
      Number(header.key),
      Number(header.octave),
      Number(header.key),
      header.scale);
      mots.forEach(function (token) {
        res.push(c.convert(token))
      })
      return res
    },
  next:function () {
      if (this.forme) {
        this.forme.next()
      };
      this.stop()
      this.play()
  },
  // overriding play and stop allows to have a part the same behaviour as a melodie
  play:function (start,dur) {
    if (this.forme) {
     Tone.Transport.schedule(function (t,element) {
       if (this[this.forme.value]) {
         this[this.forme.value].play()
       }else{
         console.log("ya pas ta forme !!");
       }
        }.bind(this))
    }else{
      this.do(function (voix) {
        console.log(voix);
        voix.play()
      })
    }
  },
  stop:function () {
    this.do(function (voix) {
      voix.stop()
    })
  }
}
