const { getData, getById } = require("../models/personModel");
const { STATUS_CODE } = require("../utils/constants");
const { errorBadRequest } = require("../utils/errors");

const getPersons = async (req, res) => {
  try {
    const persons = await getData();

    res.writeHead(STATUS_CODE.OK, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
};

const getPersonById = async (req, res, personId) => {
  try {
    const person = await getById(personId);

    if (!person) {
      errorBadRequest(req, res);
    }

    res.writeHead(STATUS_CODE.OK, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPersons, getPersonById };
