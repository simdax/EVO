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

// function used to transform sumthing like "aaba" into indices (0010)
// 5 => 0,1,2,3,4
// "aabacd" => 0, 0, 1, 0 ,2 ,3
function makeForme (val) {
  switch (typeof val) {
    case 'number':
        return range(0,val)
      break;
    case 'string':
      return convertStringToAscii(val)
      break;
    default:
      break;
  }
}
