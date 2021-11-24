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
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
};

module.exports = { API_PATH, METHOD, STATUS_CODE };
