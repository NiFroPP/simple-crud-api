const data = require("../data/persons.json");

const getData = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

module.exports = { getData };
