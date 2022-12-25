function checkNopara(str) {
  if (typeof str === "undefined") {
    throw "Paremeter empty String not exist ";
  }
}

function checkEmpty(str) {
  if (str.length === 0) {
    throw "Given String is empty.";
  }
}

function checkString(str) {
  if (typeof str !== "string") {
    throw "Given parameter is not a string";
  }
}

function puncRemove(str) {
  checkEmpty(str);
  var reg = /[\p{L}\p{N}\s]/gu;
  let stringNopunc = "";
  for (const i of str) {
    if (i.match(reg) || i === " ") {
      stringNopunc += i;
    }
  }
  let arr = stringNopunc.split(" ");
  return arr;
}

function CheckPalin(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res.toLowerCase() === str.toLowerCase();
}

module.exports = {
  palindromes(string) {
    checkNopara(string);
    checkString(string);
    string = string.trim();
    checkEmpty(string);

    let res = [];
    let arr = puncRemove(string);
    for (let i = 0; i < arr.length; i++) {
      if (CheckPalin(arr[i])) {
        res.push(arr[i]);
      }
    }
    return res;
  },
  replaceChar(string) {
    checkNopara(string);
    checkString(string);
    string = string.trim();
    checkEmpty(string);

    var finalStr = string;
    for (var i = 1; i < string.length; i += 4) {
      finalStr =
        finalStr.substring(0, i) +
        "*" +
        finalStr.substring(i + 1, string.length);
    }
    for (var j = 3; j < string.length; j += 4) {
      finalStr =
        finalStr.substring(0, j) +
        "$" +
        finalStr.substring(j + 1, string.length);
    }
    return finalStr;
  },
  charSwap(string1, string2) {
    if (typeof string1 === "undefined" || typeof string2 === "undefined") {
      throw "One of the String is not exist";
    }

    if (!(typeof string1 === "string") || !(typeof string2 === "string")) {
      throw "Type must String";
    }
    string1 = string1.trim();
    string2 = string2.trim();
    if (string1.length < 4 || string2.length < 4) {
      throw "string length must greater than four";
    }

    var p1 = string1.substring(0, 4);
    var p2 = string1.substring(4, string1.length);
    var h1 = string2.substring(0, 4);
    var h2 = string2.substring(4, string2.length);
    var result = h1 + p2 + " " + p1 + h2;
    return result;
  },
};
