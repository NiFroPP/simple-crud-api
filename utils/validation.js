const { version, validate } = require("uuid");

const { PERSON_KEYS } = require("./constants");

const validationPerson = person => {
  if (!person) return false;

  if (Object.keys(person).length < 1) return false;

  for (const key in person) {
    switch (key) {
      case PERSON_KEYS.name:
        break;
      case PERSON_KEYS.age:
        break;
      case PERSON_KEYS.hobbies:
        const isArray = Array.isArray(person[key]);
        if (!isArray) return false;
        break;
      default:
        return false;
    }
  }

  return true;
};

const validationJson = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

const uuidValidateV4 = uuid => validate(uuid) && version(uuid) === 4;

module.exports = { validationPerson, validationJson, uuidValidateV4 };
