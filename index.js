const http = require("http");
require("dotenv").config();

const { getPersons } = require("./controllers/personController");
const { errorNotFound, errorMethodNotAllowed } = require("./utils/errors");
const { API_PATH, METHOD } = require("./utils/constants");

const server = http.createServer((req, res) => {
  if (req.url === API_PATH.person) {
    if (req.method === METHOD.GET) {
      getPersons(req, res);
    } else {
      errorMethodNotAllowed(req, res);
    }
  } else {
    errorNotFound(req, res);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}...`));
