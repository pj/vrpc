import {
  TestInputType_V0,
  TestOutputType_V0
} from "../../../../runtest/simple_service/types";

import {
  AwesomeService
} from "../../../../runtest/simple_service/types";


export default function (app) {
  AwesomeService(app, function (input: TestInputType_V0): TestOutputType_V0 {
    return new TestOutputType_V0("hello " + input.a_field);
  });
}
