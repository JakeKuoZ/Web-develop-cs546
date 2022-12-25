/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

const people = require("./people");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/
const personId = require("./people");
const companies = require("./companies");

async function main() {
  try {
    // const people = await personId.getPersonById("a4392f5c-a9bf-417a-8168-26ecddb592fa");
    // const people =  await personId.getPersonById([1,2]);
    //const people = await personId.getPersonById(-1);
    const people = await personId.getPersonById(1001);
    // const people = await personId.getPersonById();
    // const people = await personId.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(people);


    // const sameJob = await personId.sameJobTitle("Help Desk Operator     ");
      // const sameJob = await personId.sameJobTitle("");
    //    console.log(sameJob);
    //const sameJob = await personId.sameJobTitle();
    //const sameJob = await personId.sameJobTitle("farmer");
    //const sameJob = await personId.sameJobTitle(123);
    //const sameJob = await personId.sameJobTitle(["Help Desk Operator"]);
    // const sameJob = await personId.sameJobTitle(true);
    // console.log(sameJob);


    // var postalCodes = await personId.getPostalCodes("Salt Lake City      ", "Utah");
    // var postalCodes = await personId.getPostalCodes("Bayside", "New York");
    // var postalCodes = await personId.getPostalCodes(13, 25);
    //var postalCodes = await personId.getPostalCodes("asdas", "  ");
    // console.log(postalCodes);


    // var postalCodes = await personId.sameCityAndState("Salt Lake City", "Utah");
    // var postalCodes = await personId.sameCityAndState("   ", "Utah");
    // var postalCodes = await personId.sameCityAndState("AUSTIN", "TEXAS");
    // console.log(postalCodes)
    // var postalCodes = await personId.sameCityAndState("Austin", "Texas");
    // console.log(postalCodes)
      // var postalCodes = await personId.sameCityAndState("    " , "      ");
      // var postalCodes = await personId.sameCityAndState(2, 29);
    //   var postalCodes = await personId.sameCityAndState("", "New York");
    // console.log(postalCodes);


    // var company = await companies.listEmployees("Yost, Harris and Cormier    ");
    // console.log(company);
    // var company = await companies.listEmployees("Kemmer-Mohr");
    // console.log(company);
    // var company = await companies.listEmployees("Will-Harvey");
    // console.log(company);
    // var company = await companies.listEmployees('foobar');
    // console.log(company);
    // var company = await companies.listEmployees(123);
    // console.log(company);
    // var company = await companies.listEmployees("sadasd");
    // console.log(company);


    // var postalCodes = await companies.sameIndustry("Auto Parts:O.e.M.     ");
    // console.log(postalCodes)
    // var postalCodes = await companies.sameIndustry(43);
    // console.log(postalCodes)
    // var postalCodes = await companies.sameIndustry('');
    // console.log(postalCodes)
    // var postalCodes = await companies.sameIndustry(' ');
    // console.log(postalCodes)
    // var postalCodes = await companies.sameIndustry('Foobar Industry');
    // console.log(postalCodes)
    // var postalCodes = await companies.sameIndustry();
    // console.log(postalCodes)


     //var postalCodes = await companies.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf     ");
    // console.log(postalCodes)
    // var postalCodes = await companies.getCompanyById(-1);
     //var postalCodes = await companies.getCompanyById(1001);
     //var postalCodes = await companies.getCompanyById();
    //  var postalCodes = await companies.getCompanyById("");
    //  console.log(postalCodes)
    // var postalCodes = await companies.getCompanyById('7989fa5e-5617-43f7-a931-46036f9dbcff');
  } catch (e) {
    console.log(e);
  }
}

main();
