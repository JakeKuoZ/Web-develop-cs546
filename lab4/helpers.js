//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const {ObjectId} = require('mongodb');



function inputValidate() {
  if(arguments.length != 9){
    throw `Some input is undefined. Need 9 input not ${arguments.length}`
  }
  for (const iterator of arguments) {
    if(typeof iterator === 'undefined' || typeof iterator === null){
      throw "One of the input is undefined or null";
    }
  }
  for (let iterator = 0; iterator < arguments.length; iterator++) {
  if(iterator === 2 || iterator === 6){
    if(!(Array.isArray(arguments[iterator]))){
      throw "Illegal data type for genres or castMembers only array";
    }
    if(arguments[iterator].length === 0){
      throw "Illegal input, array is empty";
    }
  }else{
    if(typeof arguments[iterator] !== 'string'){
      throw `Illegal input, one of the input data is not string: ${arguments[iterator]}`;
    }
  }
}
}

function idCheck(str){
  if(typeof str === 'undefined' || typeof str === null){
    throw "ID is empty";
  }
  if(typeof str !== 'string'){
    throw "Illegal ID data type.";
  }
  str = str.trim();
  if(str.length === 0){
    throw "Illegal ID given string is empty";
  }
  if (!ObjectId.isValid(str)) throw 'invalid object ID';
  return str;
}


function titleCheck(str) {
  var regx = /^[a-zA-Z0-9 ]+$/;
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  if (str.length < 2) {
    throw "Illegal input title length at lease 2";
  }
  if (!str.match(regx)) {
    throw "Illegal input for title. Letters only";
  }
  return str;
}

function studioCheck(str) {
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
  var regx = /^[A-Za-z]+\s[A-Za-z]+$/;
  str = inputTrim(str);
  if(str.length === 0){
    throw "Illegal input, empty string";
  }
  if (!str.match(regx)) {
    throw "Illegal input for director name. Format:'Firstname Lastname'; Note only one space allowed and letter only";
  }
  let str1 = str.split(" ");
  for (const iterator of str1) {
    if (iterator.length < 3) {
      throw "Illegal input for director name. First or last name have to at lease 3;";
    }
  }
  return str;
}

function ratingCheck(str) {
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
  var regx = /^[a-zA-Z ]+$/;
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
  inputValidate,
  runtimeCheck,
  castMembersCheck,
  genreCheck,
  dateCheck,
  ratingCheck,
  nameCheck,
  studioCheck,
  titleCheck,
  inputTrim,
  idCheck
};
