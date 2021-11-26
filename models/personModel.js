const fs = require("fs");
const Uuid = require("uuid");

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

const createPerson = person => {
  return new Promise((resolve, reject) => {
    const newPerson = { id: Uuid.v4(), ...person };
    data.push(newPerson);

    fs.writeFileSync("./data/persons.json", JSON.stringify(data));
    resolve(newPerson);
  });
};

module.exports = { getData, getById, createPerson };
