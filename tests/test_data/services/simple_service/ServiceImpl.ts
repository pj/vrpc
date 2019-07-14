import {Express} from "express";
import {
  TestInputType_V0,
  TestOutputType_V0
} from "../../../../runtest/simple_service/types";

const implementations = [
  [
    "AwesomeService",
    function (app: Express) {
      const service = require("../../../../runtest/simple_service/services");

      service.service(app, function (input: TestInputType_V0): TestOutputType_V0 {
        return new TestOutputType_V0("hello " + input.a_field);
      });
    }
  ]
];
export {implementations};
//
//const actionLog = [
//  {
//    "_action_type": "NewTypeAction",
//    "name": "TestInputType",
//    "description": "An awesome input type",
//    "changeLog": "Needs this for testing new type",
//    "hash": "a3ad8a8a6d0df732ef4eece7241c0f253b59ffe694f654f8def25b08d868d74a"
//  },
//  {
//    "_action_type": "AddFieldTypeAction",
//    "typeName": "TestInputType",
//    "name": "a_field",
//    "type": "string",
//    "optional": false,
//    "description": "An awesome field on the input type",
//    "changeLog": "Need this for testing add field input",
//    "hash": "716a611faeb9d2ddaa02e37a5d187183ff4d388f47c740bb2202109b3e3c8fc0"
//  },
//  {
//    "_action_type": "NewTypeAction",
//    "name": "TestOutputType",
//    "description": "An awesome output type",
//    "changeLog": "Needs this for testing new output type",
//    "hash": "2eeed3cda6513d2557733ee19f52c10ab5114385b733468a9aff6c53ea6bf727"
//  },
//  {
//    "_action_type": "AddFieldTypeAction",
//    "typeName": "TestOutputType",
//    "name": "a_field",
//    "type": "string",
//    "optional": false,
//    "description": "An awesome field on the output type",
//    "changeLog": "Need this field for testing new output type",
//    "hash": "c503f8a6a87dcd268e82e6cffa2e58db72866839a676faa2df84f470f889ae80"
//  },
//  {
//    "_action_type": "NewServiceAction",
//    "serviceName": "AwesomeService",
//    "description": "An awesome service",
//    "changeLog": "Services are good",
//    "inputType": "TestInputType",
//    "inputVersion": "716a611faeb9d2ddaa02e37a5d187183ff4d388f47c740bb2202109b3e3c8fc0",
//    "outputType": "TestOutputType",
//    "outputVersion": "c503f8a6a87dcd268e82e6cffa2e58db72866839a676faa2df84f470f889ae80",
//    "hash": null
//  },
//  {
//    "_action_type": "AddInputVersionServiceAction",
//    "changeLog": "Add an output version to our awesome service",
//    "hash": null,
//    "serviceName": "AwesomeService",
//    "version": 0
//  },
//  {
//    "_action_type": "AddOutputVersionServiceAction",
//    "changeLog": "Add an input version to our awesome service",
//    "hash": null,
//    "serviceName": "AwesomeService",
//    "version": 0
//  }
//];
//export {actionLog};
