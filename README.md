# VRPC

VRPC (versioned rpc) is a tool to generate types and service stubs that are versioned e.g. Order_V0, Order_V2 or Post_V1. This is intended to help manage forwards and backwards compatibility and make it easier to evolve software as external interfaces change.

Conceptually you can think of it as changes to the definition of your types being stored as a log of actions, where each action potentially produces a new type or service version. Underneath it uses something like a merkle tree, where every change to a type is hashed to ensure that past definitions can't be changed.

Ultimately the goal would be to version all the external interfaces of a service, including things like files and the database.

## Status

This is still extremely experimental and there's still a lot of work to do to make this truly useful. For now I've moved on to other things and it might be awhile before I continue work on this.

## Examples

**NB: Not all of this is working yet.**

The current definitions are stored in a backend file that is used to hold the current state of the definition and the log of changes generated from previous versions of it.

To define a service, first you need to define some types to use for the service:

````json
[
    {
        "name": "OrderQuery",
        "description": "Query orders from the database",
        "fields": [
            {
                "name": "username",
                "description": "username of the person ordering",
                "_type": "string",
                "changeLog": "Front end needs to be able to look up a persons orders"
            },
            {
                "name": "total",
                "description": "get orders with a specific value",
                "_type": "float",
                "optional": true,
                "changeLog": "Need this for looking up specific orders by value on the admin page"
            }
        ]
    },
    {
        "name": "OrderQueryResult",
        "description": "Result of an OrderQuery",
        "fields": [
            {
                "name": "id",
                "description": "Id of the order",
                "_type": "integer",
                "changeLog": "Useful for display"
            },
            {
                "name": "total",
                "description": "Total value of the order",
                "_type": "float",
                "changeLog": "User needs to see value of the order."
            }
        ]
    }
]
````

Run the commit command to add the definition changes to the backend file:

````
vrpc update backend.json vrpc_definitions.json
````

For now this has to be done as a step prior to adding the service definitions, to make sure that the types have been added to the backend.

Add the service definition to the bottom of vrpc_definitions.json using the types defined above:

````json
[
    ****Snip type definitions****
    {
        "name": "OrderQueryService",
        "description": "Service for querying Orders",
        "versions": [
            {
                "_from": {
                    "name": "OrderQuery",
                    "version": 0
                },
                "to": {
                    "name": "OrderQueryResult",
                    "version": 0
                },
                "changeLog": "Necessary to support the order querying feature"
            }
        ]
    }
]
````

Run the commit command again to add the service changes to the backend:

````
vrpc update backend.json vrpc_definitions.json
````

Generate the stubs for the types and the service:

````
vrpc generate backend.json src/generated
````

Define your service by passing in an express app to the service definition function along with the definition of the service:

````typescript
import {OrderQuery, OrderQueryResult, OrderQuery_V0, OrderQueryResult_V0} from './generated/types';
import {OrderQueryServiceExpress} from './generated/services';

import express from 'express';

const app = express();
app.use(express.json());

OrderQueryServiceExpress(
    app, 
    {
        V0: {
            "OrderQueryResult_V0": async (input: OrderQuery_V0) Promise<OrderQueryResult_V0> => { 
            let result;
            if (input.total){
                result = query("Select * from orders WHERE username = ? AND total = ?", input.username, input.total);
            } else {
                result = query("Select * from orders WHERE username = ?", input.username);
            }

            return new OrderQueryResult_V0(result.id, result.total);
        }
        }
    }
);
````

To query the service you can use the generated client:

````typescript
import * as client from './generated/client';

async function queryOrders(username: string) {
    return await client.OrderQueryService.V0.OrderQuery_V0(username);
}
````

## TODO

- [] Test CLI.
- [] Package and put on NPM.
- [] Options to control what services and types are generated, rather than just generating them all.
- [] Options to control generating a union type for a group of service inputs.
- [] Handle forward compatibility in client.
- [] Simplify definition of services by spreading input, rather than passing message object.
- [] Service and type deprecation and corresponding changes to generation logic.
- [] Force changelog when updating types and services.
- [] New types:
    - [] arrays
    - [] enums
    - [] intersections
    - [] unions
- [] Add HTTP methods for services, possibly by adding fields to types and services for controlling the generation process.
- [] Fix HTTP codes in generated services, e.g. 400 for misformatted requests, or 410 for deleted versions.
- [] Fix types in generated typescript services.
- [] Remove duplication in code related to handling services and types.
- [] Define services at the same time as the types they depend on.
- [] Generate other languages e.g. protobufs, json schema, python etc.
- [] Metalog format to define generatables and structures as part of log.
- [] Database access framework e.g. for Postgres, Mongo etc.

## Authors

- **Paul Johnson** - [pj](https://github.com/pj)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details