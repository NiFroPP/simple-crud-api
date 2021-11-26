const API_PATH = {
  person: "/person",
};

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
};

const ERROR_MESSAGES = {
  not_found: "The address you requested doesn`t exist",
  not_allowed: "This method not allowed",
  bad_request: "Bad request. This '/person/{id}' not exist",
  missing_field: "Missing required request fields 'name', 'age' or 'hobbies'",
};

const CONTENT_TYPE = {
  JSON: { "Content-Type": "application/json" },
};

const PERSON_KEYS = {
  name: "name",
  age: "age",
  hobbies: "hobbies",
};

module.exports = {
  API_PATH,
  METHOD,
  STATUS_CODE,
  ERROR_MESSAGES,
  CONTENT_TYPE,
  PERSON_KEYS,
};
