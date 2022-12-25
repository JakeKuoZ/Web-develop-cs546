const axios = require("axios");

async function getData() {
  const data = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  return data;
}

function parameterValid(str) {
  if (str === null || "string" !== typeof str || typeof str === "undefined") {
    throw "Error: Input parameter is not valid";
  } else if (isNull(str)) {
    throw "Error: One of the input String are blank.";
  } else if (str.length === 0) {
    throw "Error: Given string is empty";
  } else {
    return str.trim();
  }
}

const getPersonById = async (id) => {
  parameterValid(id);

  const { data } = await getData();

  for (let i = 0; i < data.length; i++) {
    if (parameterValid(id) == data[i].id) {
      return data[i];
    }
  }
  throw "Error: Person not found";
};

const sameJobTitle = async (jobTitle) => {
  parameterValid(jobTitle);
  const { data } = await getData();
  var resultArray = new Array();
  for (let i = 0; i < data.length; i++) {
    if (
      parameterValid(jobTitle).toLowerCase() == data[i].job_title.toLowerCase()
    ) {
      resultArray.push(data[i]);
    }
  }

  if (resultArray.length >= 2) {
    return resultArray;
  } else {
    throw "Error: There are not two people with that job title";
  }
};

const getPostalCodes = async (city, state) => {
  parameterValid(city);
  parameterValid(state);

  const { data } = await getData();
  var resultArray = new Array();
  for (let i = 0; i < data.length; i++) {
    if (
      state.trim().toLowerCase() == data[i].state.toLowerCase() &&
      city.trim().toLowerCase() === data[i].city.toLowerCase()
    ) {
      resultArray.push(parseInt(data[i].postal_code));
    }
  }

  if (resultArray.length >= 1) {
    resultArray.sort();
    return resultArray;
  } else {
    throw "Error: There are no postal codes for the given city and state combination";
  }
};

function isNull(str) {
  var reg = "^[ ]+$";
  var re = new RegExp(reg);
  return re.test(str);
}

function compare(a, b) {
  var splitA = a.split(" ");
  var splitB = b.split(" ");
  var lastA = splitA[splitA.length - 1];
  var lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
}

const sameCityAndState = async (city, state) => {
  parameterValid(city);
  parameterValid(state);

  const { data } = await getData();
  var resultArray = new Array();
  for (let i = 0; i < data.length; i++) {
    if (
      state.trim().toLowerCase() == data[i].state.toLowerCase() &&
      city.trim().toLowerCase() == data[i].city.toLowerCase()
    ) {
      resultArray.push(data[i].first_name + " " + data[i].last_name);
    }
  }

  if (resultArray.length >= 2) {
    resultArray.sort(compare);
    return resultArray;
  } else {
    throw "Error: There are not two people who live in the same city and state";
  }
};

module.exports = {
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState,
};
