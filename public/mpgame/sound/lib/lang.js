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
