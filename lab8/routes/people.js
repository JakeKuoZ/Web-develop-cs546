//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.peopleData;
const path = require('path');


router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve('static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  try{
    var peopleName = req.body
  //console.log(peopleName.Name);
  if(peopleName === undefined || peopleName === null){
    throw "People name is not given"
  }
  if(typeof peopleName.Name !== 'string'){
    throw "People name is not string";
  }
  var name = peopleName.Name.trim();
    if(name.length === 0){
        throw "Given people name is empty string";
    }
    let regex = /\d/g;
    if(regex.test(name)){
        throw "Given people name contains number";
    }
    let regex1 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(regex1.test(name)){
        throw "Given people name contains special character";
    }
   }
  catch(e){
    res.render('error',{error : e ,title:"Error",code:"400"});
    return;
  }

  try{
  const people = await peopleData.searchPeopleByName(name);
  //console.log(people);
  if(people === undefined || people === null){
    throw "No person found with that name";
  }
  if(people.length === 0){
    throw "No person found with that name";
  }
  res.render('peopleFound',{people: people , title: "People Found", searchName:name});
  }
  catch(e){
    res.status(404).render('personNotFound',{person : name ,title:"Not Found",code:"404"})
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  try{
  var id = req.params.id;
  if(id === undefined || id === null){
    throw "Given ID is not valid";
}
id = id.trim();
if(id.length === 0){
    throw "Given ID is empty";
}
let regex = /^\d+\.?\d*$/;
if(!(regex.test(id))){
    throw "Given ID is contains others than number";
}
  }
  catch(e){
    res.render('error',{error : e ,title:"Error",code:"400"});
    return
  }

  try{
  const people = await peopleData.searchPeopleByID(id);
  //console.log(people);
  if(people === undefined || people === null){
    throw "No person found with that name";
  }
  if(people.length === 0){
    throw "No person found with that name";
  }
  res.render('personFoundByID',{people:people, title : "Person Found"})
  }
  catch(e){
    res.status(404).render('personNotFound',{person : id ,title:"Not Found",code:"404"})
  }
});


module.exports = router;