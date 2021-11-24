const { getData } = require("../models/personModel");
const { STATUS_CODE } = require("../utils/constants");

const getPersons = async (req, res) => {
  try {
    const persons = await getData();

    res.writeHead(STATUS_CODE.OK, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPersons };
