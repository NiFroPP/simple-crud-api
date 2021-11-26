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
        break;
      default:
        return false;
    }
  }

  return true;
};

function validationJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}
module.exports = { validationPerson, validationJson };
