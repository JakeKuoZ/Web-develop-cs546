
const { ObjectId } = require("mongodb");



function checkString(str){
  if(typeof str !== 'string'){
    throw "Illegal input not string."
  }
}


function checkExist(input){
    if(!input){
        throw `Illegal input: reason "${input}" is not valid`;
    }
    if(typeof input === 'undefined' || typeof input === null){
        throw "Illegal input either undefined nor null";
      }
    }


function idCheck(str){
  checkExist(str);
  checkString(str);
  str = str.trim();
  if(str.length === 0){
    throw "Illegal ID given string is empty";
  }
  if (!ObjectId.isValid(str)) throw 'invalid object ID';
  return str;
}

function plotCheck(str){
    checkExist(str);
    checkString(str);
    str = str.trim();
    if(str.length === 0){
        throw "Illegal plot given plot is empty";
    }
    return str;
}

function titleCheck(str) {
  checkExist(str);
  checkString(str);
  var regx = /^[a-zA-Z0-9 ]+$/;
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  if (str.length < 2) {
    throw "Illegal input title length at lease 2";
  }
  if (!str.match(regx)) {
    throw "Illegal input for title. Letters and numbers only";
  }
  return str;
}

function studioCheck(str) {
  checkExist(str);
  checkString(str);
  var regx = /^[a-zA-Z ]+$/;
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  if (str.length < 5) {
    throw "Illegal input for studio. Length at lease 5";
  }
  if (!str.match(regx)) {
    throw "Illegal input for studio. Letters only";
  }
  return str;
}

function nameCheck(str) {
  checkExist(str);
  checkString(str);
  var regx = /^[A-Za-z]+\s[A-Za-z]+$/;
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  if (!str.match(regx)) {
    throw "Illegal input for name. Format:'Firstname Lastname'; Note only one space allowed and letter only";
  }
  let str1 = str.split(" ");
  for (const iterator of str1) {
    if (iterator.length < 3) {
      throw "Illegal input for name. First or last name have to at lease 3;";
    }
  }
  return str;
}

function ratingCheck(str) {
  checkExist(str);
  checkString(str);
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  if (
    str !== "G" &&
    str !== "PG" &&
    str !== "PG-13" &&
    str !== "R" &&
    str !== "NC-17"
  ) {
    throw "Illegal input for rating, rating: G, PG, PG-13, R, NC-17; Case sensitive";
  }
  return str;
}

function dateCheck(s) {
  checkExist(s);
  checkString(s);
  s = inputTrim(s);
  if(s.length === 0){
    throw "Illegal input, empty string";
  }
  if (!/^\d\d\/\d\d\/\d\d\d\d$/.test(s)) {
    throw "Illegal date format or input not date as 'mm/dd/yyyy' number only";
  }
  const parts = s.split("/").map((p) => parseInt(p, 10));

  if (parts[0] === 2 && parts[1] >= 29) {
    throw "Illegal date, ignore leap year. All years Februray only have 28 days. ";
  }
  parts[0] -= 1;
  const d = new Date(parts[2], parts[0], parts[1]);
  const d1 = new Date();
  if (parts[2] < 1900 || parts[2] > (d1.getFullYear() + 2)) {
    throw "Illegal date, year before 1900 or past 2024";
  }

  if (
    d.getMonth() !== parts[0] ||
    d.getDate() !== parts[1] ||
    d.getFullYear() !== parts[2]
  ) {
    throw "Illegal date";
  }
  return s;
}

function genreCheck(array){
  checkExist(array);
  var regx = /^[a-zA-Z ]+$/;
  if(Array.isArray(array) === false){
    throw "Illegal input is not an array";
  }

  array = inputTrim(array);
  for (const iterator of array) {
    if(iterator.length === 0){
      throw "Illegal array, empty element for genres";
    }
    if(!(iterator.match(regx))){
      throw "Illegal input in genres, letters only no number,special and punctuation characters";
    }
    if(iterator.length < 5){
      throw "Illegal input in genres, input length at lease 5 characters long";
    }
  }
  return array;
}

function castMembersCheck(array){
  checkExist(array);
  if(Array.isArray(array) === false){
    throw "Illegal input is not an array";
  }
  array = inputTrim(array);
  var regx = /^[A-Za-z]+\s[A-Za-z]+$/;
  for (const iterator of array) {
    if(iterator.length === 0){
      throw "Illegal array, empty element for caster";
    }
    if(!(iterator.match(regx))){
      throw "Illegal input in castMember,letters only no number,special and punctuation characters format 'first last'";
    }
    let tempA = iterator.split(" ");
    for (const i of tempA) {
      if(i.length < 3){
        throw "Illegal input in castMember, first and last name at lease 3 characters long";
      }
    }
  }
  return array;
  
}


function runtimeCheck(str){
  checkExist(str);
  checkString(str);
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  let regex1 = /^\d+h\s[0-5]?\dmin$/i;
  let str1 = str.toLowerCase().split("h");
  if(str1[0] < 1 ){
    throw "Illegal runtime length, runtime have to 1 hour or more than 1 hour";
  }
  if(!(str.match(regex1))){
    throw "Illegal time format, #h #min case insensitive,mins cant go more than 59";
  }
  let c = parseInt(str1[0]) + "h" + str1[1];
  return c;
}

function reivewratingCheck(num){
  checkExist(num);
  let regex = /^\d{0,2}(?:\.\d)?$/;
  if(typeof num !== "number"){
    throw "Illegal rating, not a number";
  }
  if(num < 1 || num > 5){
    throw "Illegal rating, range from 1 to 5";
  }
  let a = "" + num;
  if(!(regex.test(a))){
    throw "Illegal rating, rating have to be only one decimal places"
  }
  return num;
}

function inputTrim(input){
    var a = [];
    if(Array.isArray(input)){
      for (const iterator of input) {
        a.push(iterator.trim());
      }
    }else{
      input = input.trim();
    }
    return Array.isArray(input)? a:input;
  }

  

module.exports = {
  runtimeCheck,
  castMembersCheck,
  genreCheck,
  dateCheck,
  ratingCheck,
  nameCheck,
  studioCheck,
  titleCheck,
  inputTrim,
  idCheck,
  plotCheck,
  checkExist,
  checkString,
  reivewratingCheck,
};
