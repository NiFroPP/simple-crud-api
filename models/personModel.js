const fs = require("fs");
const Uuid = require("uuid");

// let data = require("../data/persons.json");
let data = [];

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

    // fs.writeFileSync("./data/persons.json", JSON.stringify(data));
    resolve(newPerson);
  });
};

const updateData = (id, person) => {
  return new Promise((resolve, reject) => {
    const personIndex = data.findIndex(curr => curr.id === id);
    data[personIndex] = { id, ...person };

    // fs.writeFileSync("./data/persons.json", JSON.stringify(data));
    resolve(data[personIndex]);
  });
};

const removeData = id => {
  return new Promise((resolve, reject) => {
    data = data.filter(curr => curr.id !== id);

    console.log(data);
    // fs.writeFileSync("./data/persons.json", JSON.stringify(data));
    resolve();
  });
};

module.exports = { getData, getById, createPerson, updateData, removeData };
