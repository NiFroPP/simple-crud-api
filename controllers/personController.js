const {
  getData,
  getById,
  createPerson,
  updateData,
} = require("../models/personModel");
const { STATUS_CODE, CONTENT_TYPE } = require("../utils/constants");
const { errorBadRequest, errorInvalidPerson } = require("../utils/errors");
const { validationPerson, validationJson } = require("../utils/validation");

const getPersons = async (req, res) => {
  try {
    const persons = await getData();

    res.writeHead(STATUS_CODE.OK, CONTENT_TYPE.JSON);
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

    res.writeHead(STATUS_CODE.OK, CONTENT_TYPE.JSON);
    res.end(JSON.stringify(person));
  } catch (error) {
    console.log(error);
  }
};

const setNewPerson = async (req, res) => {
  try {
    const buffers = [];
    let person = {};

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    let data = Buffer.concat(buffers).toString();
    const isJsonString = validationJson(data);

    if (isJsonString) {
      const parseData = JSON.parse(data);
      const isValidPerson = validationPerson(parseData);

      if (isValidPerson) {
        person = await createPerson(parseData);

        res.writeHead(STATUS_CODE.CREATED, CONTENT_TYPE.JSON);
        res.end(JSON.stringify(person));
      }
    }

    errorInvalidPerson(req, res);
  } catch (error) {
    console.log(error);
  }
};

const updatePerson = async (req, res, personId) => {
  try {
    const person = await getById(personId);

    console.log(person);

    if (!person) {
      errorBadRequest(req, res);
    }

    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    let data = Buffer.concat(buffers).toString();

    const isJsonString = validationJson(data);

    if (isJsonString) {
      const { name, age, hobbies } = JSON.parse(data);
      const personData = {
        name: name || person.name,
        age: age || person.age,
        hobbies: hobbies || person.hobbies,
      };

      const isValidPerson = validationPerson(personData);

      if (isValidPerson) {
        const updPerson = await updateData(personId, personData);

        res.writeHead(STATUS_CODE.OK, CONTENT_TYPE.JSON);
        res.end(JSON.stringify(updPerson));
      }
    } else {
      errorInvalidPerson(req, res);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPersons, getPersonById, setNewPerson, updatePerson };
