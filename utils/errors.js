const { STATUS_CODE, ERROR_MESSAGES, CONTENT_TYPE } = require("./constants");

const errorBase = (req, res, statusCode, message) => {
  res.writeHead(statusCode, CONTENT_TYPE.JSON);
  res.end(JSON.stringify({ message }));
};

const errorNotFound = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_FOUND, ERROR_MESSAGES.not_found);
};

const errorNotFoundPerson = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_FOUND, ERROR_MESSAGES.person_not_found);
};

const errorMethodNotAllowed = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_ALLOWED, ERROR_MESSAGES.not_allowed);
};

const errorBadRequest = (req, res) => {
  errorBase(req, res, STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.bad_request);
};

const errorInvalidPerson = (req, res) => {
  errorBase(req, res, STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.missing_field);
};

const errorInvalidUuidPerson = (req, res) => {
  errorBase(req, res, STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.invalid_uuid);
};

module.exports = {
  errorNotFound,
  errorNotFoundPerson,
  errorMethodNotAllowed,
  errorBadRequest,
  errorInvalidPerson,
  errorInvalidUuidPerson,
};
