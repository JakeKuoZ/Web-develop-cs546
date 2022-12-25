//Axios call to get all data
const axios = require('axios');

const getAllPeople = async () => {
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    let people = [];
    if(searchPersonName === undefined || searchPersonName === null){
        throw `Given people name is not valid: ${searchPersonName} `;
    }
    if(typeof searchPersonName !== 'string'){
        throw "Given people name is not valid Please enter String only.";
    }
    searchPersonName = searchPersonName.trim();
    if(searchPersonName.length === 0){
        throw "Given people name is empty string";
    }
    let regex = /\d/g;
    if(regex.test(searchPersonName)){
        throw "Given people name contains number";
    }
    let regex1 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(regex1.test(searchPersonName)){
        throw "Given people name contains special character";
    }
    const peopledata = await getAllPeople();
    for (let index = 0; index < peopledata.length; index++) {
        if(peopledata[index].firstName.toLowerCase().includes(searchPersonName.toLowerCase()) || peopledata[index].lastName.toLowerCase().includes(searchPersonName.toLowerCase()) )
        people.push(peopledata[index]);
    }
    return people.slice(0,20);
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
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
    const peopledata = await getAllPeople();
    for (let index = 0; index < peopledata.length; index++) {
        if(peopledata[index].id == id){
            return peopledata[index];
        }
    }
};

module.exports = { searchPeopleByName, searchPeopleByID };

