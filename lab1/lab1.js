function questionOne(arr) {
  // TODO: Implement question 1 here

  //iterate through given array check if its prime number
  for (let i = 0; i < arr.length; i++) {
    let n = arr[i];

    if (n === 0) {  //condition when element is 0
      arr[i] = false;
    } else if (n === 2) {  // start condition when element is 2
      arr[i] = true;
    } else if (n <= 1 || n < 0) { // condition when element is less than 1 or negative number;
      arr[i] = false;
    } else {
      for (let j = 2; j < n; j++) { //for loop starts at 2 then mod every number less than element.
        if (n % j === 0) { // condition if mod number within element euquals to 0 set element to false, not prime
          arr[i] = false; 
          break;
        } else {  // other set to be true;
          arr[i] = true;
        }
      }
    }
  }
  return arr;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  // 5,3,10
  let sum = 0;

  if (startingNumber === 0 || commonRatio === 0) {  //condition if parameter starting number or common ratio have value 0;
    return 0;
  } else if (numberOfTerms <= 0 || !(Number.isInteger(numberOfTerms))) { // condition if number of terms is negative or decimal return NaN;
    return NaN;
  } else {
    for (let i = 0; i < numberOfTerms; i++) { //iterate through validated number add starting number * (commonration ^ i);
      sum += startingNumber * Math.pow(commonRatio, i);
    }
  }
  return sum;
}

function questionThree(str) {
  // TODO: Implement question 3 here
  let strings = [];  //declare empty array
  let string = str.replace(/\s/gm, ""); //remove space in the string;
  let valiString = ""; // empty string;

  function isLetter(value) {  //method check if elements in String are letters not symbol or numbers;
    if (value.toUpperCase() != value.toLowerCase()) { 
      return true;
    } else {
      return false;
    }
  }

  for (const iterator of string) {  //forof loop add valid string character to the empty string;
    if (isLetter(iterator)) {
      valiString += iterator;
    }
  }

  for (let i = 0; i < valiString.length; i++) { // iterate check if not vowels then push to the array;
    if (
      valiString.charAt(i) != "a" &&
      valiString.charAt(i) != "e" &&
      valiString.charAt(i) != "i" &&
      valiString.charAt(i) != "o" &&
      valiString.charAt(i) != "u"
    ) {
      strings.push(valiString.charAt(i));
    }
  }

  return strings.length;   //return numbers of array elements as result;
}

function questionFour(fullString, substring) { //thoughts: indexof() will return start index of substring. Then using loop go through string each time starts at
  //previous substring index add substring length will avoid duplicate value.
  // TODO: Implement question 4 here
  let occurrences = 0; 
  let index = 0;
  let increase = substring.length; // each loop index will increase substring length

    while (fullString.includes(substring)) { //while lopp with condition if substring is in the string;
      index = fullString.indexOf(substring, index); // right now index is first substring found in the string if there is multiple substring in the string
      if (index != -1) { //condition if there is matched elements
        occurrences++;
        index = increase + index;
      } else {
        break;
      }
    }
    if(occurrences === 0){
      return "String not exist";
    }
    else{
      return occurrences;
    }
  } 


//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: "Kuo",
  lastName: "Zhang",
  studentId: "10478257",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
