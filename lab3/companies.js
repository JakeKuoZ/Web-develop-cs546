const axios = require("axios");

function compare(a, b) {
  var splitA = a.split(" ");
  var splitB = b.split(" ");
  var lastA = splitA[splitA.length - 1];
  var lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
}

async function getDataCorp() {
  const data = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
  );
  return data;
}

function parameterValid(str) {
  if (str == null || "string" !== typeof str || typeof str === "undefined") {
    throw "Error: Input parameter is not valid";
  } else if (isNull(str)) {
    throw "Error: One of the input String are blank.";
  } else if(str.length === 0){
    throw "Error: Given string is empty";
  }else {
    return str.trim();
  }
}

async function getPersonByCompanyId(companyId) {
  if (companyId == null || "string" === !typeof companyId) {
    throw "Error: id is null or not string";
  }
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  var resultArray = new Array();
  for (let i = 0; i < data.length; i++) {
    if (companyId == data[i].company_id) {
      resultArray.push(data[i].first_name + " " + data[i].last_name);
    }
  }

  if (resultArray.length >= 2) {
    resultArray.sort(compare);
  }
  return resultArray;
}

const listEmployees = async (name) => {
  parameterValid(name);

  const { data } = await getDataCorp();

  var company_id;
  var company;
  for (let i = 0; i < data.length; i++) {
    if (name.trim().toLowerCase() == data[i].name.toLowerCase()) {
      company_id = data[i].id;
      company = data[i];
      break;
    }
  }
  if (company_id == null || company == null) {
    throw "Error: No company name with " + name;
  }

  var employees = getPersonByCompanyId(company_id);

  company.employees = await employees;
  return company;
};

const sameIndustry = async (industry) => {
  parameterValid(industry);
  const { data } = await getDataCorp();
  var resultArray = new Array();
  for (let i = 0; i < data.length; i++) {
    if (industry.trim().toLowerCase() == data[i].industry.toLowerCase()) {
      resultArray.push(data[i]);
    }
  }

  if (resultArray.length >= 1) {
    return resultArray;
  } else {
    throw "Error: No companies in that industry";
  }
};

const getCompanyById = async (id) => {
  parameterValid(id);

  const { data } = await getDataCorp();
  for (let i = 0; i < data.length; i++) {
    if (id.trim() == data[i].id) {
      return data[i];
    }
  }

  throw "Error: Company not found ";
};

function isNull(str) {
  var reg = "^[ ]+$";
  var re = new RegExp(reg);
  return re.test(str);
}

module.exports = {
  listEmployees,
  sameIndustry,
  getCompanyById,
};
