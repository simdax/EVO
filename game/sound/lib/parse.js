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
  this.key="c";
  this.scale="major";
//  this.voix={"synth":"0"}        //  you better have to populate the two last !
}

Parser = function (JSON, timbre, forme="all") {
    this.voix={};
    this.forme=forme;
    this.init(JSON,timbre)
}

Parser.prototype={
  init: function (JSON, timbre){
    // les mots réservés
    var keys=Object.keys(new defaultEvent)
    // take header
    for(var i = 0; i < keys.length; i++) {
      if (JSON[keys[i]]) {
        this[keys[i]]=JSON[keys[i]];
        // we delete to not reparse these keys
        delete JSON[keys[i]]
      }
    }
    for(key in JSON) {
      if (typeof JSON[key] == 'string') {
        // here, we populate our "voix"
        var k; if (key=="voix") {k=timbre}else{k=key}
        this.voix[k]=this.parse(JSON[key]);
      }else{ // we go on another leaf
        this.voix[key]=new Parser(JSON[key],key)
      }
    }
  },
  parse:function (string) {
    // TODO if string ==> forme
    var mots=[]
    // get each lines and remove empty lines
    var lignes=string.split("\n").filter(Boolean)
    lignes.forEach(function (ligne) {
      // découpe la ligne en mots
      var l=ligne.split(/\s+/).filter(Boolean)
      l.forEach(function (mot) {
        // decoupe le mot en
        // nombres ou signe ~ ou x
        // avec optionellement plusieurs + ou -
        var match=mot.match(/[\d~x]([-+]+)?/g)
        mots.push(match)
      })
    });
    return mots
  }
}
