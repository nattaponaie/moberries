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

## Project Structure
```bash

│── tests
│── src                              # All source files
│   ├── api                          # API stuffs
│      ├── middleware                # Handler, Wrapper functions
│      ├── v1.0                      # API version
│         ├── business-logics        # Business logics
│         ├── controllers            # Controllers
│         ├── domains                # Database model functions
│      ├── ...                       # etc.
│   ├── configs                      # Environments, Database config
│   ├── database                     # Database stuffs
│      ├── fixtures                  # Seed data
│      ├── migrations                # Sequelize migration files
│      ├── models                    # Sequelize models
│      ├── seeders                   # Sequelize seeders
│   ├── utils                        # Reuseable function
│   └── ...                          # etc.
└── ...
```

## Database

A database will be running when moberries-api container is up.

Or you want to run database separately, please remove the following line out from docker-compose file
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

*NOTE*

Database migration and seeder are executed automatically when container is up.

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
