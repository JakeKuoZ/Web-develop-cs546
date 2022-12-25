const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils')



//for test purposes I comment out all the code except for testing function;

//arrays
//arrayStats

// try{
//   const a = arrayUtils.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]); // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
//   const b = arrayUtils.arrayStats([7, 9, 11, 15, 19, 20, 35, 0]); // Returns: { mean: 14.5, median: 13, mode: 0, range: 35, minimum: 0, maximum: 35, count: 8, sum: 116 }
//  const  c = arrayUtils.arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]); // Returns: { mean: 36.4, median: 36.5, mode: [11,54], range: 125, minimum: -25, maximum: 100, count: 10, sum: 364 }

//   console.log(a);
//   console.log(b);
//   console.log(c);
// }catch(e){
//   console.log(e);
//   console.error('arrayStats failed test case');
// }

// try{
//   //const a = arrayUtils.arrayStats([]);
//   //const b = arrayUtils.arrayStats("banana");
//   const c = arrayUtils.arrayStats(["guitar", 1, 3, "apple"]);
//   //const d = arrayUtils.arrayStats();
//   console.log(a);
//   console.log(b);
//   console.log(c);
//   console.log(d);
// }catch(e){
//   console.log(e);
//   console.log("arrayStats failed sccessfully");
// }

//makeObjects
// try{
//   const a = arrayUtils.makeObjects([4, 1], [1, 2]);
// const b =arrayUtils.makeObjects(["foo", "bar"], [5, "John"]);
// const c =  arrayUtils.makeObjects (["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"]);
// const d = arrayUtils.makeObjects([true, undefined], [null, null]); 
// const e = arrayUtils.makeObjects([undefined, true], ["date", "9/11/2022"]); 
//   console.log(a);
//   console.log(b);
//   console.log(c);
//   console.log(d);
//   console.log(e);
// }catch(e){
//   console.log(e);
//   console.error('makeObject failed test case');
// }

// try{
//   //const a = arrayUtils.makeObjects([]);
//  //const b =arrayUtils.makeObjects("banana");
//  //const c =  arrayUtils.makeObjects (1,2,3);
// //const d = arrayUtils.makeObjects(["guitar", 1, 3, "apple"]); 
//  //const e = arrayUtils.makeObjects();
// const f = arrayUtils.makeObjects([1],[1,2]);
// console.log(a);
//    console.log(e);
//   console.log(c);
//   console.log(d);
//   console.log(e);
//   console.log(f);
// }catch(e){
//   console.log(e);
//   console.log("makeObjects failed sccessfully");
// }

// commonElements();

// const arr1 = [5, 7]; 
// const arr2 = [20, 5]; 
// const arr3 = [true, 5, 'Patrick']; 
// const arr4 = ["CS-546", 'Patrick']; 
// const arr5 = [67.7, 'Patrick', true]; 
// const arr6 = [true, 5, 'Patrick']; 
// const arr7 = [undefined, 5, 'Patrick']; 
// const arr8 = [null, undefined, true];
// const arr9 = ["2D case", ["foo", "bar"], "bye bye"];
// const arr10= [["foo", "bar"], true, "String", 10];

// try{
// console.log(arrayUtils.commonElements(arr1, arr2)); // Returns [5]
// console.log(arrayUtils.commonElements(arr3,arr4,arr5)); // returns ['Patrick']
// console.log(arrayUtils.commonElements(arr5,arr6)); // returns ['Patrick', true]
// console.log(arrayUtils.commonElements(arr9,arr6)); // returns []
// console.log(arrayUtils.commonElements(arr7,arr8)); // returns [undefined]
// console.log(arrayUtils.commonElements(arr3, arr4, arr5, arr7)); // returns ['Patrick']
// console.log(arrayUtils.commonElements(arr9, arr10)); // returns [["foo", "bar"]]
// }catch(e){
//   console.log(e);
//   console.error('commontElements failed test case');
// }

// try{
// //console.log(arrayUtils.commonElements([],[]));
// //console.log(arrayUtils.commonElements("test"));
// //console.log(arrayUtils.commonElements([1,2,"nope"]));
// console.log(arrayUtils.commonElements());
// }
// catch(e){
//   console.log(e);
//   console.log("commonElements failed sccessfully");
// }




//Strings
/**
 *  Palindromes
 */
// try{
//  const a = stringUtils.palindromes("Hi mom, At noon, I'm going to take my kayak to the lake'");  //Returns: ["mom", "noon", "kayak"]);
//   const b = stringUtils.palindromes('Wow! Did you see that racecar go?'); // Returns: ["Wow", "Did", "racecar"]
//   const c = stringUtils.palindromes('Hello World'); // Returns: []
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }
// catch(e){
//   console.log(e);
//   console.error("palindromes test case failed");
// }


// try{
//   //const a = stringUtils.palindromes(); 
//   //const b = stringUtils.palindromes("       "); 
//   //const c = stringUtils.palindromes(1); 
//   //const d = stringUtils.palindromes(["hellow there"]);
//   console.log(a);
//   console.log(b);
//   console.log(c);
//   console.log(d);
// }
// catch(e){
//   console.log(e);
//   console.log("palindromes failed sccessfully");
// }


/**
 *  replaceChar
 */
// try{
//   const a = stringUtils.replaceChar("Daddy");
//   const b = stringUtils.replaceChar("Mommy");
//   const c = stringUtils.replaceChar("Hello, How are you? I hope you are well");
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }catch(e){
//   console.log(e);
//   console.error("replaceChar test case failed");
// }

// try{
//   //const a = stringUtils.replaceChar("      ");
//   const b = stringUtils.replaceChar(123);
//   //const c = stringUtils.replaceChar();
  
// }catch(e){
//     console.log(e);
//     console.log("replaceChar failed successfully");
// }


/**
 * charSwap
 */
// try{
//   const a = stringUtils.charSwap("Patrick", "Hill"); //Returns "Hillick Patr";
//   const b = stringUtils.charSwap("hello", "world");
//   console.log(a);
//   console.log(b);
// }catch(e){
//   console.log(e);
//   console.error("charSwap test case failed");
// }

// try{
//  //const a = stringUtils.charSwap("Patrick", ""); //Throws error
// //const b = stringUtils.charSwap(); // Throws Error
// //const c = stringUtils.charSwap("John"); // Throws error
// //const d = stringUtils.charSwap ("h", "Hello") ;// Throws Error
// const f = stringUtils.charSwap ("h","e"); // Throws Error
// }
// catch(e){
//   console.log(e);
//   console.log("charSwap failed sccussefully");
    
//   }


// Objects  
//DeepEquality
// const first = {a: 2, b: 3};
// const second = {a: 2, b: 4};
// const third = {a: 2, b: 3};
// const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
// const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};

// const a = {a: {sA: "Hello", sB: "There", sC: "Class"}, b:{g:{1:"4"},h:2}, c: true, d: "Test"};
// const b = {a: {sA: "Hello", sB: "There", sC: "Class"}, b:{g:{1:"4"},h:2}, c: true, d: "Test"};
// try{
//   console.log(objUtils.deepEquality(first, second)); // false
//   console.log(objUtils.deepEquality(forth, fifth)); // true
//   console.log(objUtils.deepEquality(forth, third)); // false
//   console.log(objUtils.deepEquality({}, {})); // true}
//   console.log(objUtils.deepEquality(a, b));
// }  catch(e){
//   console.log(e);
//   console.error("deepEquality test case failed");
// }

// try{
//   //console.log(objUtils.deepEquality([1,2,3], [1,2,3])); // throws error 
//   //console.log(objUtils.deepEquality("foo", "bar")); // throws error
//   console.log(objUtils.deepEquality());
// }catch(e){
//   console.log(e);
//   console.log("deepEquality failed sccussefully");
// }


// const first = {name: {first: "Patrick", last: "Hill", ms: { p: "Parth"}}, age: 46};
// const second = {school: "Stevens", name: {first: "Patrick", last: "Hill", ms: { pt: "PT", p: "Parth"}}};
// const third = {a: 2, b: {c: true, d: false}};
// const forth = {b: {c: true, d: false}, foo: "bar"};

// try{
// console.log(objUtils.commonKeysValues(first, second)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
// console.log(objUtils.commonKeysValues(third, forth)); // returns {b: {c: true, d: false}, c: true, d: false }
// console.log(objUtils.commonKeysValues({}, {})); // {}
// console.log(objUtils.commonKeysValues({a: 1}, {b: 2})); // {}
// }catch(e){
//   console.log(e);
//   console.error("commonKeysValues test case failed");
// }
// try{
// //console.log(objUtils.commonKeysValues([1,2,3], [1,2,3])); // throws error 
// console.log(objUtils.commonKeysValues("foo", "bar")); // throws error
// }catch(e){
//   console.log(e);
//   console.log("commonKeysValues failed sccussefully");
// }

// try{
//   console.log(objUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => 2 / n));
//   console.log(objUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2));
//   /* Returns:
// {
//   a: 2.45,
//   b: 3.74,
//   c: 3.16
// }
// */
// }catch(e){
//   console.log(e);
//   console.error("calculateObject test case failed");
// }
// let a = [1,2,3];
// try{
//   //console.log(objUtils.calculateObject({ a: "3", b: 7, c: 5 }, n => n *2));
//   //console.log(objUtils.calculateObject(a, n => n *2));
//   console.log(objUtils.calculateObject({ a: 3, b: 7, c: 5 }, "aaa"));
// }
// catch(e){
//   console.log(e);
//   console.log("calculateObject failed sccussefully");
// }

