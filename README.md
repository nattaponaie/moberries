![Logo of the project](https://github.com/nattaponaie/moberries/blob/development/moberries-logo.png)
# Moberries

## Prerequisite

```bash
Docker
Docker Compose
```

## Installation

Use the Docker Compose to install this project.

```bash
docker-compose build moberries-api
docker-compose up moberries-api
```

## Database

A database will be running when moberries-api image is up.

Or you can remove the following line out from docker-compose file
```bash
depends_on: 
   - moberries-postgres
```

Configurations
```bash
DATABASE_HOST: "moberries-postgres"
DATABASE_NAME: "moberries"
DATABASE_USERNAME: "api"
DATABASE_PASSWORD: "api"
```

## Database Schema

![Image description](https://github.com/nattaponaie/moberries/blob/development/database-schema.png)

## API Documentation

https://documenter.getpostman.com/view/3924263/SWE9aHQu?version=latest

OR

http://localhost:9000/api/v1.0/docs

## Unit Testing

```bash
docker-compose up unit-test
```
