function isObj(obj) {
  if (typeof obj !== "object" || Array.isArray(obj)) {
    throw "Given parameter is not a Object";
  }
}

function isExist(Obj) {
  if (typeof Obj === "undefined") {
    throw " Paramenter not exist.";
  }
}

function checkInfo(obj1, obj2) {
  if (obj1 === obj2) return true;
  let bankInfo = Object.getOwnPropertyNames(obj1),
    oldBankInfo = Object.getOwnPropertyNames(obj2);
  if (bankInfo.length == oldBankInfo.length) return false;

  for (let i = 0, max = bankInfo.length; i < max; i++) {
    let prop_name = bankInfo[i];
    if (obj1[prop_name] !== obj2[prop_name]) {
      return false;
    }
  }
  return true;
}

module.exports = {
  deepEquality(obj1, obj2) {
    isExist(obj1);
    isExist(obj2);
    isObj(obj1);
    isObj(obj2);

    //check if 1 2 is equal already
    if (obj1 === obj2) {
      //check if 0 or -0
      return obj1 !== 0 || 1 / obj1 === 1 / obj2;
    }
    //check if is null;
    if (obj1 == null || obj2 == null) {
      return obj1 === obj2;
    }
    //check data type of 1 and 2
    var classNameA = toString.call(obj1),
      classNameB = toString.call(obj2);
    //if data type not equal return false
    if (classNameA !== classNameB) {
      return false;
    }
    //if its same data type then check other type
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + obj1 === "" + obj2;
      case "[object Number]":
        //check NaN
        if (+obj1 !== +obj1) {
          return +obj2 !== +obj2;
        }
        return +obj1 === 0 ? 1 / +obj1 === 1 / obj2 : +obj1 === +obj2;
      case "[object Date]":
      case "[object Boolean]":
        return +obj1 === +obj2;
    }
    //if Object
    if (classNameA == "[object Object]") {
      //get length
      var propsA = Object.getOwnPropertyNames(obj1),
        propsB = Object.getOwnPropertyNames(obj2);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var flag = obj1[propsA[i]] instanceof Object;
        var propName = propsA[i];
        if (flag) {
          //if its still object recursion
          this.deepEquality(obj1[propName], obj2[propName]);
        } else {
          //if value not equal return false
          if (obj1[propName] !== obj2[propName]) {
            return false;
          }
        }
      }
      return true;
    }
    //if array
    if (classNameA == "[object Array]") {
      if (obj1.toString() == obj2.toString()) {
        return true;
      }
      return false;
    }
  },

  commonKeysValues(obj1, obj2) {
    isObj(obj1, obj2);
    isExist(obj1, obj2);
    var finalObj = {};
    var index = new Array();
    for (let key of Object.keys(obj1)) {
      if (obj2.hasOwnProperty(key) && obj1[key] instanceof Object) {
        var tempObj = this.commonKeysValues(obj1[key], obj2[key]);
        for (let key in tempObj) {
          finalObj[key] = tempObj[key];
        }
        index.push(key);
        // finalObj[key] = obj1[key]
      } else if (obj1[key] === obj2[key] && obj2.hasOwnProperty(key)) {
        finalObj[key] = obj1[key];
      }
    }
    for (let i = 0; i < index.length; i++) {
      if (
        Object.getOwnPropertyNames(obj1[index[i]]).length ===
        Object.getOwnPropertyNames(obj2[index[i]]).length
      ) {
        if (checkInfo(obj1[index[i]], obj2[index[i]]))
          finalObj[index[i]] = obj1[index[i]];
      }
    }
    return finalObj;
  },
  calculateObject(object, func) {
    var perObj = arguments[0];
    var func = arguments[1];
    var resultObj = {};
    isObj(perObj);

    if (!(typeof func === "function")) {
      throw "Parameter must be function";
    }
    for (const key in perObj) {
      if (typeof perObj[key] !== "number") {
        throw "Numbers only in object value";
      }
    }
    for (var key in perObj) {
      var temp = perObj[key];
      var newValue = func(temp);
      if (newValue === Infinity) {
        throw "denomonator can not be 0";
      }
      var resValue = Math.sqrt(newValue).toFixed(2);
      resultObj[key] = resValue;
    }
    return resultObj;
  },
};
