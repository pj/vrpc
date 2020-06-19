/**
 * **GENERATED CODE DO NOT EDIT!**
 */
import { Request, Response } from "express";

function convertInternalDefinition<E, I>(definition: E): I {
  const externalDefinition: any = {};
  for (let [version] of Object.entries(definition)) {
  }

  return externalDefinition;
}

/*
 * TestService
 *
 * An awesome service
 */
import { AnotherTest, AnotherTest_V0, Test, Test_V0 } from "./types";

export type TestService = {
  V0: {
    TestService_V0: (input: AnotherTest_V0) => Test_V0;
  };
};
type TestServiceInternal = {
  V0: {
    AnotherTest_V0: (input: AnotherTest_V0) => Test_V0;
  };
};
const TestServiceTypeMapping = {
  V0: {
    AnotherTest_V0: [AnotherTest, Test]
  }
};

export function TestServiceExpress(app: any, definition: TestService): void {
  // convert External definition
  const internalDefinition: TestServiceInternal = convertInternalDefinition(
    definition
  );

  app.post("/TestService", (req: Request, res: Response) => {
    const body = req.body;

    const serviceVersion = body["serviceVersion"];
    if (!serviceVersion) {
      throw new Error("Please provide service version");
    }
    const serviceVersionDefinition = internalDefinition[serviceVersion];
    if (!serviceVersionDefinition) {
      throw new Error("Unknown service version, please use the client.");
    }

    const inputType = body["inputType"];
    if (!inputType) {
      throw new Error("Please provide input type");
    }
    const inputVersion = body["inputVersion"];
    if (!inputVersion) {
      throw new Error("Please provide input version");
    }

    const serviceFunction =
      serviceVersionDefinition[inputType + "_V" + inputVersion];
    if (!serviceFunction) {
      throw new Error(
        "Unable to locate input type: " + inputType + "_V" + inputVersion
      );
    }

    const mappingTableVersion =
      TestServiceTypeMapping[serviceVersionDefinition];
    if (!mappingTableVersion) {
      throw new Error("Invalid service version");
    }

    const mappingClasses = mappingTableVersion[inputType + "_V" + inputVersion];
    if (!mappingClasses) {
      throw new Error("Invalid input type or version");
    }

    const [inputTypeClass, outputTypeClass] = mappingClasses;

    const inputMessage = inputTypeClass.deserialize(body.input);
    const response = serviceFunction(inputMessage);
    const outputMessage = outputTypeClass.serialize(response);
    res.json(outputMessage);
    return;
  });
}
