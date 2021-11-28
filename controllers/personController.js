const {
  getData,
  getById,
  createPerson,
  updateData,
  removeData,
} = require("../models/personModel");
const { STATUS_CODE, CONTENT_TYPE } = require("../utils/constants");
const {
  errorBadRequest,
  errorInvalidPerson,
  errorNotFoundPerson,
  errorInvalidUuidPerson,
} = require("../utils/errors");
const {
  validationPerson,
  validationJson,
  uuidValidateV4,
} = require("../utils/validation");

const wrap = fn => {
  return async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      console.log(error);
      res.writeHead(STATUS_CODE.SERVER_ERROR, CONTENT_TYPE.JSON);
      res.end(JSON.stringify({ message: "Internal server error" }));
    }
  };
};

const validateIdAndUuidPerson = async (req, res, personId) => {
  const isUuidValidV4 = uuidValidateV4(personId);

  if (!isUuidValidV4) {
    errorInvalidUuidPerson(req, res);
    return;
  }

  const person = await getById(personId);

  if (!person) {
    errorNotFoundPerson(req, res);
    return;
  }

  return person;
};

const getPersons = wrap(async (req, res) => {
  const persons = await getData();

  res.writeHead(STATUS_CODE.OK, CONTENT_TYPE.JSON);
  res.end(JSON.stringify(persons));
});

const getPersonById = wrap(async (req, res, personId) => {
  const person = await validateIdAndUuidPerson(req, res, personId);
  if (!person) return;

  res.writeHead(STATUS_CODE.OK, CONTENT_TYPE.JSON);
  res.end(JSON.stringify(person));
});

const setNewPerson = wrap(async (req, res) => {
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
    } else {
      errorInvalidPerson(req, res);
    }
  } else {
    errorInvalidPerson(req, res);
  }
});

const updatePerson = wrap(async (req, res, personId) => {
  const person = await validateIdAndUuidPerson(req, res, personId);
  if (!person) return;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  let data = Buffer.concat(buffers).toString();

  const isJsonString = validationJson(data);

  if (isJsonString) {
    const parseData = JSON.parse(data);
    const isValidPerson = validationPerson(parseData);

    if (isValidPerson) {
      const { name, age, hobbies } = parseData;
      const personData = {
        name: name || person.name,
        age: age || person.age,
        hobbies: hobbies || person.hobbies,
      };

      const updPerson = await updateData(personId, personData);

      res.writeHead(STATUS_CODE.OK, CONTENT_TYPE.JSON);
      res.end(JSON.stringify(updPerson));
    } else {
      errorInvalidPerson(req, res);
    }
  } else {
    errorInvalidPerson(req, res);
  }
});

const deletePerson = wrap(async (req, res, personId) => {
  const person = await validateIdAndUuidPerson(req, res, personId);
  if (!person) return;

  await removeData(personId);

  res.writeHead(STATUS_CODE.NO_CONTENT, CONTENT_TYPE.JSON);
  res.end(
    JSON.stringify({
      message: `Person '${personId}' was successfully removed`,
    })
  );
});

module.exports = {
  getPersons,
  getPersonById,
  setNewPerson,
  updatePerson,
  deletePerson,
};
