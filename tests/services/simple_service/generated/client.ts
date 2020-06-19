/**
 * **GENERATED CODE DO NOT EDIT!**
 */
import * as request from "request-promise-native";

import { AnotherTest, AnotherTest_V0, Test, Test_V0 } from "./types";

export const TestServiceClientV0 = {
  AnotherTest_V0: async (input: AnotherTest_V0): Promise<Test_V0> => {
    const response = await request.post({
      url: this.host + "/TestService",
      json: true,
      body: input,
      serviceVersion: "V0",
      inputType: "AnotherTest",
      inputVersion: "0"
    });

    const body = JSON.parse(response);

    return Test.deserialize(body);
  }
};
