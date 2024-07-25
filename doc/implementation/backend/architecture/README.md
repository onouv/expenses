# Hexagonal Structure

The hexagonal structure to be used throughout the app is shown as an example for the Account Aggregate below. 

## Layers
The hexagon layers, from outside to inside, are as follows: 

- adapters: connect to outside world
- ports: decouple adapters and application layers
- application: 
  - serve requests from outside by implementing driven ports, 
  - delegate business decisions to domain layer
  - drive outside dependencies through the driving ports
- domain: implement ALL business logic

If mapped to java packages, this looks like so:  

![Overview](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/onouv/expenses/main/doc/implementation/backend/architecture/accounts-hexagonal.puml)


## Architectural Rules
In hexagonal architecture, a few general rules apply:
1) **driven** means the direction from outside towards inside of the hexagon: the hexagon is driven by the outside world. **driving** is the opposite direction: the hexagon drives something in the outside world.
2) The innermost domain layer provides all business logic and is not depending on anything outside 
3) *package* dependencies **generally** direct from outside to inside of the hexagon, *except* for dependencies from 
application to ports layer
4) Layers are opaque. For example, do not reach from adapters to application. Dedicated connections  are management by dependency injection in both directions.
5) The application layer   
-- must implement the driven ports interfaces  
-- may use the driving port classes directly  
-- may use the driving port interfaces by `@Inject` 
6) The ports layer must provide interfaces and helpers such as Dto or Data classes
7) The **`adapters`** layer   
-- may use the driven port interfaces by `@Inject`
-- may use the driven classes directly
-- must implement the driving interfaces 


Remark: as an alternative structure, one could put the ports package inside the application layer. In that case, there would be only inwards dependencies between the layers, at the cost of having to reach into sub-packages of the application from the adapters. Matter of personal taste.  