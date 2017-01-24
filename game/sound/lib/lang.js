function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = {}
    for (var attr in obj) {
        copy[attr] = obj[attr];
    }
    return copy;
}

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function range(start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) {
          return index + start;
      });
    }
convertStringToAscii=function (str) {
  var res=[];
  for (var i = 0; i < str.length; i++) {
    res.push(str[i].charCodeAt(0) - 97)
  }
return res
}
