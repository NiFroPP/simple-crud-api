const http = require("http");
require("dotenv").config();

const {
  getPersons,
  getPersonById,
  setNewPerson,
  updatePerson,
  deletePerson,
} = require("./controllers/personController");
const { errorNotFound, errorMethodNotAllowed } = require("./utils/errors");
const { API_PATH, METHOD } = require("./utils/constants");

const server = http.createServer((req, res) => {
  const personId = req.url.split("/")[2]; // /person/:id

  if (req.url === API_PATH.person) {
    if (req.method === METHOD.GET) {
      getPersons(req, res);
    } else if (req.method === METHOD.POST) {
      setNewPerson(req, res);
    } else {
      errorMethodNotAllowed(req, res);
    }
  } else if (personId) {
    if (req.method === METHOD.GET) {
      getPersonById(req, res, personId);
    } else if (req.method === METHOD.PUT) {
      updatePerson(req, res, personId);
    } else if (req.method === METHOD.DELETE) {
      deletePerson(req, res, personId);
    } else {
      errorMethodNotAllowed(req, res);
    }
  } else {
    errorNotFound(req, res);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}...`));
