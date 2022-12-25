/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  
For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed.
 You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/
(function () {

  let myForm = document.getElementById('myForm');
  let textInput = document.getElementById('text_input');
  let myUl = document.getElementById('results');
  const errorContainer = document.getElementById('error-container');
  const errorTextElement = errorContainer.getElementsByClassName(
    'text-goes-here'
  )[0];

  function checkEmpty(str) {
    if (str === undefined || str === null) {
      throw "Please enter a value"
    }
    str = str.trim();
    if (str.length === 0) {
      throw "Please enter a valid string"
    }
  }

  function checkLetter(str) {

    let regex = /^[a-zA-Z]+$/
    for (let index = 0; index < str.length; index++) {
      if (regex.test(str.charAt(index))) {
        throw "Please enter number only";
      }
    }
  }

  function checkFormat(str) {
    for (let index = 0; index < str.length; index++) {
      if (str.charAt(index) === ']' && index !== str.length - 1) {
        if (str.charAt(index + 1) !== ',' && str.charAt(index + 2) !== '[') {
          throw "Please enter array in format [1,2,3],[1,2,3]"
        }
      }
    }
    if (str.charAt(0) !== "[") {
      throw "Please enter array in format [1,2,3],[1,2,3]";
    }
    else if (str.charAt(str.length - 1) !== "]" && str.charAt(str.length - 1) !== ",") {
      throw "Please enter array in format [1,2,3],[1,2,3]";
    }
  }

  function checkDecimal(str) {
    if (str.includes('.')) {
      throw "Please enter whole numbers only";
    }
  }

  function spaceRemover(str){
    let regex = /\d/;
    let result = str.replace(/\s/g, '');
    if(result.length === 0){
      throw "Please enter some value";
    }
    if(!(regex.test(result))){
      throw "Please enter some value";
    }
    if(result.charAt(1) === ","){
      result = result.slice(1);
    }
    return result;
  }

  function charcterRemover(str){
    let result = str.replace(/[`~!@#$%^*()_|+\-=?;:'".<>\{\}\\\/]/gi, '');
    if(result !== str){
      throw "Please no special character, and in format [1,2,3],[1,2,3]"
    }
  }

  function commaCheck(str){
    let regex = /.*?,,+.*/;
    if(regex.test(str)){
      throw "Please enter valid value";
    }
  }

  myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      checkEmpty(textInput.value);
      let textInputTrim = textInput.value.trim();
      textInputTrim = spaceRemover(textInputTrim);
      charcterRemover(textInputTrim);
      checkLetter(textInputTrim);
      checkFormat(textInputTrim);
      checkDecimal(textInputTrim);
      commaCheck(textInputTrim);
      document.getElementById("error-container").hidden=true;
      let li = document.createElement('li');
      let count = document.querySelectorAll('li');
      if (count.length % 2 === 0) {
        li.classList.add('is-green')
      } else {
        li.classList.add('is-red')
      }
      let val = textInputTrim;
      if (val.substring(val.length - 1, val.length) == ',') {
        val = val.slice(0, val.length - 1)
      }
      val = val.replace(/\],\[/g, ',').slice(1, val.replace(/\],\[/g, ',').length - 1);
      val = val.split(',');
      for (let i = 0; i < val.length; i++) {
        val[i] = val[i] / 1;
      }
      li.innerHTML = '[' + val.sort(function (a, b) {
        return a - b;
      }) + ']';
      myUl.appendChild(li);
      myForm.reset();
      textInput.focus();
    }
    catch (e) {
      document.getElementById("error-container").hidden= false;
      const message = typeof e === 'string' ? e : e.message;
      errorTextElement.innerHTML = e;
      myForm.reset();
    }
  }
  )
})();