# Expenses

A web app tmall businesses to track expenses.

## Summary

This app allows small business like freelancers to keep track of their expenses and generate reports for tax purposes.

## Technology Stack

This app is modelled in terms of domain driven design. Backend will be built in [hexagonal architecture](./doc/implementation/architecture/README.md).

## Backend 

- Quarkus
- Hibernate/ Panache ontop of postgresql
- flyway for database schema version control
- MapStruct for mapping between domain and database / API DTO
- lombok for boilerplate stuff

