# Project Overview

[![Node.js CI](https://github.com/jsilvaigor/contact-list/actions/workflows/node.js.yml/badge.svg)](https://github.com/jsilvaigor/contact-list/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/e192bb7a479b706178d8/maintainability)](https://codeclimate.com/github/jsilvaigor/contact-list/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e192bb7a479b706178d8/test_coverage)](https://codeclimate.com/github/jsilvaigor/contact-list/test_coverage)
[![Heroku](http://heroku-badge.herokuapp.com/?app=awesome-contact-list&root=api/v1/health)](https://awesome-contact-list.herokuapp.com/api/v1/health)

This is a simple api that provides two functionalities `login` and `contacts`. 

With the `login` funcionality you can create an account and do a login. A secure token will be returned in both actions. 

With the `contacts` functionality you can `create`, `read`, `update` and `delete` a contact. The authentication token will be required.

The `health` functionality returns the `NODE_ENV` value and the result of a simple query on the database to check the connection.

In the file `requests.http` you can see sample requests for the endpoints

# Dependencies
- [NodeJS LTS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

# Technologies

The project is developed using `expressjs`, `typescript`, `typeorm`, `firebase` and `jest` for testing.

There are also some quality of life libraries like `helmet` for increasing security, `joi` and `dotenv` for environment \
variables validation, `routing-controllers` for a better experience routing in `express`.

The database used is `postgresql`, you can run it locally using the `make db` command provided.\
For this command to work make a copy of the contents of `ormconfig.ev.ci` file and place them inside your local `.env` file
changing the `PLACEHOLDER` with your postgres connection string. \
The project is configured to user typeorm migrations, they are going to be executed automatically with `make db`

# Required environment variables

The project is provided with a `.env.example` file with all used environment variables. You will have to make a copy and name it `.env`.

- `NODE_ENV`: can be `development`, `test` or `production`; defaults to `development`
- `LOG_LEVEL`: can be `debug`,`info`, `warn` or `error`; defaults to `debug`
- `PORT`: can be any valid network port, defaults to `3000`
- `PREFIX`: the application URL prefix, defaults to `/api/v1`
- `DATABASE_URL`: postgresql connection string, *required*
- `SALTS_OR_ROUNDS`: number of salts or rounds that will be used to hash using `bcrypt`, defaults to 10
- `JWT_SECRET`: secret used to sign JWT, *required*
- `FIREBASE_SERVICE_ACCOUNT_KEY`: the contents of your `serviceAccountKey.json` as an inline string, *required*
- `FIREBASE_DATABASE_URL`: your firebase realtime database url, *required*
- `FIREBASE_REFERENCE`: your firebase database base reference, defaults to `address_book`

# How to run

The project is configured to use a [Makefile](https://www.gnu.org/software/make/) to automate some tasks.

If you are not comfortable using it you can run this as a common NodeJS project, running `npm install` and `npm run start:dev` in your local environment and provide your own database.

- **make** or **make all**

    - Executes `make db` e `make app`

- **make create_network**

    - Creates a shared docker network to be used by the database and application stacks

- **make app**
    - Executes the application simulating a production environment

- **make db**

    - Creates the database structure for local testing

- **make stop**

    - Stops the database and application containers

- **make clean**

    - Deletes all application related containers, databases, dependencies and temporary files

# Next steps

- Create a demo frontend client using a SPA framework (React, Angular or VueJS)
- Improve code coverage to reach 100%
- Add a Redis database to persist tokens
- Validate if tokens are already present on Redis before generating a new one on login
- Add roles/scopes to tokens, so users can have permissions
- Find a better way to test firebase on integration tests without using a live account


