function checkArray(array) {
  if (!Array.isArray(array)) {
    throw "Given value is not an array";
  }
}

function checkEmpty(array) {
  if (array.length === 0) {
    throw "Given value is empty";
  }
}

function checkNopara(array) {
  if (typeof array === "undefined") {
    throw "Given value there is no parameter";
  }
}

function checkInt(array) {
  for (const iterator of array) {
    if (typeof iterator !== "number") {
      throw "Given array is not only integers";
    }
  }
}

function sortArray(array) {
  array = array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

function mean(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total = total + array[i];
  }

  return (total / array.length).toFixed(2);
}

function median(array) {
  const median = Math.floor(array.length / 2);
  if (array.length % 2 === 0) {
    return ((array[median] + array[median - 1]) / 2).toFixed(2);
  } else {
    return array[median];
  }
}

function mode(array) {
  var counts = {};
  var maxKeys = [];
  var max = -Infinity;
  for (const iterator of array) {
    if (counts[iterator] === undefined) {
      counts[iterator] = 0;
    }
    counts[iterator] += 1;
  }
  let ObjArray = Object.values(counts);
  let checkZero = 0;
  for (let i = 0; i < ObjArray.length; i++) {
    if (ObjArray[i] === 1) {
      checkZero += 1;
    } else {
      checkZero += 0;
    }
  }
  if (checkZero !== ObjArray.length) {
    for (var key in counts) {
      if (counts[key] === max) {
        //Another key with the same value
        maxKeys.push(key); //Add it to the array
      } else if (counts[key] > max) {
        //Found a bigger key, start over...
        maxKeys = [key]; //Replace the array
        max = counts[key];
      }
    }
    if (maxKeys.length === 1) {
      return parseFloat(maxKeys[0]);
    } else {
      let a = [];
      for (const iterator of maxKeys) {
        a.push(parseFloat(iterator));
      }
      return a;
    }
  } else {
    return 0;
  }
}

function range(array) {
  let rangeN = array[array.length - 1] - array[0];
  return rangeN;
}

function sum(array) {
  let result = 0;
  for (const iterator of array) {
    result += iterator;
  }
  return result;
}

function ff(obj, element) {
  if (Array.isArray(element)) {
    var s = element.toString();
    if (obj.hasOwnProperty(element)) {
        obj[s] += 1000;
    } else {
        obj[s] = 1000;
    }

    for (let i = 0; i < element.length; i++) {
        ff(obj, element[i])
    }
} else {
    if (obj.hasOwnProperty(element)) {
        let count = obj[element]
        count += 1
        obj[element] = count
    } else {
        obj[element] = 1
    }
}
}

module.exports = {
  arrayStats(array) {
    checkNopara(array);
    checkArray(array);
    checkEmpty(array);
    checkInt(array);
    sortArray(array);

    const Stats = {
      count: array.length,
      maximum: Math.max(...array),
      minimum: Math.min(...array),
      sum: sum(array),
      range: range(array),
      mean: parseFloat(mean(array)),
      median: parseFloat(median(array)),
      mode: mode(array),
    };
    return Stats;
  },

  makeObjects(...array) {
    for (const iterator of array) {
      checkArray(iterator);
      checkEmpty(iterator);
    }

    if (arguments.length === 0) {
      throw "Parameter is empty";
    }

    for (const iterator of array) {
      if (iterator.length !== 2) {
        throw "Given array have more or less than two elements";
      }
    }

    var obj = {};
    for (let i = 0; i < array.length; i++) {
      obj[array[i][0]] = array[i][1];
    }
    return obj;
  },

  commonElements(...array) {
    if(arguments.length === 0){
      throw "Parameter is empty";
    }
    for (const iterator of arguments) {
      if(!(Array.isArray(iterator))){
        throw "Given value is not array";
      }
    }
    
    for (const iterator of arguments) {
      if(iterator.length === 0){
        throw "Given array is empty";
      }
    }
    
    if (array.length < 2) {
      throw "Given value have to be more than two array";
    }

    var obj = {}
        var finalArr = new Array();

        for (let i = 0; i < arguments.length; i++) {
            ff(obj, arguments[i])
        }
        for (var index in obj) {
            if (obj[index] >= arguments.length * 1000) {
                var strings = index.split(",");
                finalArr.push(strings)
            }
        }
        for (var index in obj) {
            if (finalArr.length > 0) {
                for (var i = 0; i < finalArr.length; i++) {
                    if (finalArr[i].includes(index)) {
                        break;
                    } else if (obj[index] >= arguments.length && obj[index] < 1000) {
                        finalArr.push(index);
                        break;
                    }
                }
            } else {
                if (obj[index] >= arguments.length && obj[index] < 1000) {
                    finalArr.push(index);
                }
            }

        }

        return finalArr
  },
};
