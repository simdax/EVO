
//// dic manipulation


var Lang= {

  // First, checks if it isn't implemented yet.
  format:function (str) {
      var args = arguments;
      delete args[0];
      return str.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    },

get:function (key,dict) {
        var k=Object.keys(dict);
        for(var i = 0; i < k.length; i++) {
            if((Object.keys(dict[k[i]])).indexOf(key) >= 0){
                return dict[k[i]][key]
            } // exists
        }
        return -1; //error
    },

getEvo:function (name) {
    for(var phyl in Especes){
        for(var esp in Especes[phyl]){
            if (esp==name) {
                return Especes[phyl][name]
            }
        }
    }
    //error
    return -1
},

clone:function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = {}
    for (var attr in obj) {
        copy[attr] = obj[attr];
    }
    return copy;
},


/// equality

arraysEqual:function (a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


}
