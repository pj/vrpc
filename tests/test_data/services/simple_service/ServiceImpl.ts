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

      service.AwesomeService(function (input: TestInputType_V0): TestOutputType_V0 {
        return new TestOutputType_V0("hello " + input.a_field);
      });

      service.AwesomeServiceExpress(app);
    }
  ]
];
export {implementations};