# Expenses

A web app to allow small businesses to track expenses.

## Summary

This app allows small business like freelancers to keep track of their expenses and generate reports for tax purposes.


## Use Cases

![Overview](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/onouv/expenses/main/doc/use-cases/overview.usecase.puml)

## Domain Model
![Overview](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/onouv/expenses/main/doc/domain-model/domain.class.puml)

## Technology Stack

This app is modelled in terms of domain driven design. Backend will be built in [hexagonal architecture](./doc/implementation/backend/architecture/README.md).

## Backend 

- Quarkus
- Hibernate/ Panache on top of postgresql
- flyway for database schema version control
- MapStruct for mapping between domain and database / API DTO
- lombok for boilerplate stuff

## Frontend

- React/ Nextjs
