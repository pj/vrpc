vrpc (versioned rpc) is an idea that I've been working on for awhile, It's goal is to make it easy to build http services and clients that are simple to make backwards and forwards compatible as servers and clients evolve. 

It combines two related ideas, the first is to structure type and service configuration as a log of changes rather than as a static file, kind of like a version control system. The second is to use the config log to generate a series of types and service stubs that are versioned. This makes it easy to handle backwards compatibility on the server and forward compatibility on the client.

Right now this is something I'm still working on, so the code isn't very functional, but you can see it at: https://github.com/pj/vrpc.

As an example, rather than a static definition of a type like:

```typescript
type Order {
    order_id: number;
    date_created: Date;
    entries: OrderEntry[]
}

type OrderEntry {
    item_name: string;
}
```

The types would be defined as a log of actions:

```json
[
    {
        "action": "Newtype", 
        "name": "Order"
    },
    {
        "action": "AddField", 
        "name": "order_id", 
        "type": "Order", 
        "dataType": "number"
    },
    {
        "action": "NewType", 
        "name": "OrderEntry"
    },
    {
        "action": "AddField", 
        "name": "item_name", 
        "type": "OrderEntry", 
        "dataType": "string"
    },
    {
        "action": "AddField", 
        "name": "entries", 
        "type": "Order", 
        "dataType": "OrderEntry", 
        "repeated": true
    }, 
    {
        "action": "AddField", 
        "name": "date_created", 
        "type": "Order", 
        "dataType": "Date"
    }
]
```

Which would be used to generate a series of versioned types like:

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

Since generating a new version for every small change leads to excessive new types, there's also a system to group actions: 

```json
[
    {
        "action": "Group",
        "actions": [
            {
                "action": "Newtype", 
                "name": "Order"
            },
            {
                "action": "AddField", 
                "name": "order_id", 
                "type": "Order", 
                "dataType": "number"
            },
            {
                "action": "NewType", 
                "name": "OrderEntry"
            },
            {
                "action": "AddField", 
                "name": "item_name", 
                "type": "OrderEntry", 
                "dataType": "string"
            },
            {
                "action": "AddField", 
                "name": "entries", 
                "type": "Order", 
                "dataType": "OrderEntry", 
                "repeated": true
            }, 
            {
                "action": "AddField", 
                "name": "date_created", 
                "type": "Order", 
                "dataType": "Date"
            }
        ]
    }
]
```

Generating: 

```typescript
class OrderEntry_V1 {
    item_name: string
}

class Order_V1 {
    order_id: number;
    entries: OrderEntry_V1[];
    date_created: Date;
}
```

This helps to enforce the versioning at the type level making it easy to understand how your interface is changing.

To prevent someone from modifying previous log entries and invalidating the versioning, the fields of every action are hashed together with the hash of the previous entry. This is similar to the way that git or blockchains work (technically a merkle tree).

# Services

The log can also be used to define services, which are basically a name and a set of input and output types for the service. Right now a service can have multiple input types for a single output type, but not multiple output types for each input type.

For example:

```json
[
  {
    "action": "NewTypeAction",
    "typeName": "Order",
  },
  {
    "action": "AddFieldTypeAction",
    "type": "Order",
    "name": "name",
    "dataType": "string",
  },
  {
    "action": "NewTypeAction",
    "type": "OrderResponse",
  },
  {
    "action": "AddFieldTypeAction",
    "type": "OrderResponse",
    "name": "friendly_greeting",
    "dataType": "string",
  },
  {
    "action": "NewServiceAction",
    "name": "OrderService",
  },
  {
    "action": "AddVersionServiceAction",
    "name": "OrderService",
    "inputType": "Order",
    "inputVersion": 1,
    "outputType": "OrderResponse",
    "outputVersion": 1
  },
  {
    "action": "AddFieldTypeAction",
    "type": "Order",
    "name": "title",
    "dataType": "string",
  },
  {
    "action": "AddVersionServiceAction",
    "name": "OrderService",
    "inputType": "Order",
    "inputVersion": 2,
    "outputType": "OrderResponse",
    "outputVersion": 1
  }
]
```

This would let you define services using generated stubs like so:

```typescript
import {Express, express} from "express";
import {
  Order_V1,
  Order_V2,
  OrderResponse_V1
} from "./vrpc/types";
import {
  OrderService
} from "./vrpc/services";
const app = express();

OrderService(app, function (input: Order_V1 | Order_V2): OrderResponse_V1 {
    if (input instanceof Order_V1) {
        return new OrderResponse_V1(`hello ${input.name}`);
    } else {
        return new OrderResponse_V1(`hello ${input.title} ${input.name}`);
    }
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`)
```

# Why not just use git?

Partly for fun, partly for a bit more flexibility in how the log is served. For example you could host the log on an SQL server, or as part of a distributed system using something like PAXOS or raft to store and update the log.

Also it makes it easier to enforce proper use of the log, since you can have code to ensure that new entries are valid before adding them.

# Status

You can see the current code at https://github.com/pj/vrpc.

Right now the code is grad student quality and was really just a test to see if I could get the concept working. There are a whole bunch of things that need to be added:

- Different backends e.g. SQL.
- More log validation - validate that log entries make sense.
- Generate easy to use forwards compatible clients.
- Handle multiple concurrent users.
- Real system to submit changes to the log.
- Expanded type system e.g. arrays, unions, intersections, better ways of composing types.
- Caching the log and generated artifacts.

I think this approach could be generalized to most system boundaries e.g. database schemas could be defined as log entries and then rows versioned based on it. This would make it easier to ensure backwards compatibility as the database schema evolves over time, the same way it would work for service definitions.

Config logs could probably be generalised into a kind of metalog, so the schema of different types of log entries would be added to the config log itself. Validation and more complicated logic could be added as webassembly.