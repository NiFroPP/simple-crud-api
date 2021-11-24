const { STATUS_CODE } = require("./constants");

const messages = {
  not_found: "The address you requested doesn`t exist",
  not_allowed: "This method not allowed",
};

const errorBase = (req, res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
};

const errorNotFound = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_FOUND, messages.not_found);
};

const errorMethodNotAllowed = (req, res) => {
  errorBase(req, res, STATUS_CODE.NOT_ALLOWED, messages.not_allowed);
};

module.exports = { errorNotFound, errorMethodNotAllowed };
