const { STATUS_CODE, ERROR_MESSAGES } = require("./constants");

const errorBase = (req, res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
};

const errorNotFound = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_FOUND, ERROR_MESSAGES.not_found);
};

const errorMethodNotAllowed = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_ALLOWED, ERROR_MESSAGES.not_allowed);
};

const errorBadRequest = (req, res) => {
  errorBase(req, res, STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.bad_request);
};

module.exports = { errorNotFound, errorMethodNotAllowed, errorBadRequest };
