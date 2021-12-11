# Simple CRUD API

### Downloading and installing NPM modules

```
$ git clone https://github.com/NiFroPP/simple-crud-api.git
```

```
$ git checkout simple-crud-api
```

```
$ npm i
```

### Details:
* Start server:
    * `npm run start:dev` server should start in development mode with `nomemon`
    * `npm run start:prod` server should start in development mode with `webpack` (starts the `webpack` build process and after that runs the build file)
* API path `/person`:
    * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
* Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
