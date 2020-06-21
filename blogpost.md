VRPC (versioned rpc) is a tool to generate types and service definitions that are versioned e.g. Order_V0, Order_V2 or Post_V1. This is intended to help manage forward and backward compatibility and make it easier to evolve software as external interfaces change.

Conceptually you can think of it as working like a version control system, but for the types in your software rather than just files. Changes to your types are stored as a series of change actions e.g. "add a field", "add a service version" rather than as a single static definition file. Each action potentially produces a new type or service version to be generated. Underneath it uses something like a merkle tree, where every change to a type is hashed to ensure that past definitions can't be changed.

Ultimately the goal would be to version all the external interfaces of a service, including things like files and the database.

Currently it can only generate very simple scalar and reference types and only generates code in typescript and service stubs for express. The code isn't very functional, but you can see it at: https://github.com/pj/vrpc.

## Aspirational Example

Right now I haven't got this completely working, so most of this is aspirational :). 

As an idea of how this could work, rather than a static definition of a type like:

```typescript
type OrderQuery {
    username: string;
    total: number;
}

type OrderQueryResult {
    id: number;
    total: number;
}
```

You would define them in a type definition json file:

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

To commit changes to this file you would call update using the CLI:

````
vrpc update backend.json vrpc_definitions.json
````

backend.json stores the current type definition and a log of changes generated from it.

To generate the actual types 

```typescript
class Order_V1 {
    order_id: number;
}

class OrderEntry_V1 {
    item_name: string
}

class Order_V2 {
    order_id: number;
    entries: OrderEntry[];
}

class Order_V3 {
    order_id: number;
    entries: OrderEntry[];
    date_created: Date;
}
```

## Services


## Client

Finally, you can use the generated client to query