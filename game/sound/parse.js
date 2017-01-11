

Parser = function (JSON) {

    var analyse=function (string) {
        var res=[];
        var lignes=string.split("\n")
        // remove 
        if (lignes[0]==["\n"]) {
            lignes.splice(0,1)
        }
        if (lignes[lignes.length-1]==["\n"]) {
            lignes.splice(lignes.length-1,1)
        }

        for(var i = 0; i < lignes.length; i++) {
            var l=[];
            var ligne=lignes[i].split(" ")
            //clean
            for(var ii = 0; ii < ligne.length; ii++) {
                if (ligne[ii]=='') {
                    ligne.splice(i,1)
                }
            }
            console.log(ligne);
            for(var j = 0; j < ligne.length; j++) {
                var mots=ligne[j];
                for(var k = 0; k < mots.length; k++) {
                    l.push(mots[k])
                }
            }
            res.push(l)
        };
        return res
    };


    var res=[]; var header={};
    var keys=["tempus","key","scale"]
    for(var i = 0; i < keys.length; i++) {
        header[keys[i]]=JSON[keys[i]]
        delete JSON[keys[i]]
    }
    /// avec les données du header
    //    var converter=new ConvertMel();
    for(key in JSON) {
        //        var m=new Melodie;
        //      m.converter=converter;
        var mel=analyse(JSON[key]);
        res.push(mel)
    }
    return res
}




a={ b: `
0 
01 21 742 11  ~  
01 21 745 63  3
`
  };
c=Parser(a)
""

