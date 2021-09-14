# Project Overview

[![Node.js CI](https://github.com/jsilvaigor/contact-list/actions/workflows/node.js.yml/badge.svg)](https://github.com/jsilvaigor/contact-list/actions/workflows/node.js.yml)

This is a simple api that provides two functionalities `login` and `contacts`. 

With the `login` funcionality you can create an account and do a login. A secure token will be returned in both actions. 

With the `contacts` functionality you can `create`, `read`, `update` and `delete` a contact. The authentication token will be required.

# Dependencies
- [NodeJS LTS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

# Technologies

The project is developed using `expressjs`, `typescript`, `typeorm`, `firebase` and `jest` for testing.

There are also some quality of life libraries like `helmet` for increasing security, `joi` and `dotenv` for environment \
variables validation, `routing-controllers` for a better experience routing in `express`.

The database used is `postgresql`, you can run it locally using the `make db` command provided.\
The table structure is provided in the `scripts/database/001-Create-Structure.sql` file.

# Required environment variables

The project is provided with a `.env.example` file with all used environment variables. You will have to make a copy and name it `.env`.

- `NODE_ENV`: can be `development`, `test` or `production`; defaults to `development`
- `LOG_LEVEL`: can be `debug`,`info`, `warn` or `error`; defaults to `debug`
- `PORT`: can be any valid network port, defaults to `3000`
- `PREFIX`: the application URL prefix, defaults to `/api/v1`
- `DATABASE_URL`: postgresql connection string, *required*
- `SALTS_OR_ROUNDS`: number of salts or rounds that will be used to hash using `bcrypt`, defaults to 10
- `JWT_SECRET`: secret used to sign JWT, *required*

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






