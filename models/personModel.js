const data = require("../data/persons.json");

const getData = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

const getById = id => {
  return new Promise((resolve, reject) => {
    const person = data.find(curr => curr.id === id);
    resolve(person);
  });
};

module.exports = { getData, getById };
