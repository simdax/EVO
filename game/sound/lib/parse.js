Parser = function (JSON) {
  // why not 'this' ??????
  Parser.prototype.init(JSON)
}

Parser.prototype={
  init: function (JSON) {
    this.header={};
    this.dict={}
    var keys=["tempus","key","scale"]
    // take header
    for(var i = 0; i < keys.length; i++) {
      this.header[keys[i]]=JSON[keys[i]]
      delete JSON[keys[i]]
    }
    // parse dict
    for(key in JSON) {
      var mel=this.parse(JSON[key]);
      this.dict[key]=mel
    }
  },
  parse:function (string) {
    var mots=[]
    // get each lines and remove empty
    var lignes=string.split("\n").filter(Boolean)
    // cut words
    lignes.forEach(function (ligne) {
      var l=ligne.split(/\s+/)
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
