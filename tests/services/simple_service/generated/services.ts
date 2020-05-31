/**
 * **GENERATED CODE DO NOT EDIT!**
 */
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

function convertExternalDefinitionToInternal(
  externalDefinition: any,
  serviceTypeMapping: any
): any {
  const internalDefinition: any = {};
  const previousDefinition = new Map();
  const orderedVersions = Array.from(Object.keys(serviceTypeMapping));
  orderedVersions.sort();
  for (let serviceVersion of orderedVersions) {
    const serviceMapping = serviceTypeMapping[serviceVersion];
    if (!internalDefinition[serviceVersion]) {
      internalDefinition[serviceVersion] = {};
    }

    for (let inputVersion of Object.keys(serviceMapping)) {
      const [_, [inputType, outputType]] = serviceMapping[inputVersion];
      const previousKey =
        inputType._type +
        "_" +
        inputType.version +
        "_" +
        outputType._type +
        "_" +
        outputType.version;
      if (
        externalDefinition[serviceVersion] &&
        externalDefinition[serviceVersion][inputVersion]
      ) {
        internalDefinition[serviceVersion][inputVersion] =
          externalDefinition[serviceVersion][inputVersion];
        previousDefinition.set(
          previousKey,
          externalDefinition[serviceVersion][inputVersion]
        );
        continue;
      }

      if (previousDefinition.has(previousKey)) {
        internalDefinition[serviceVersion][
          inputVersion
        ] = previousDefinition.get(previousKey);
        continue;
      }

      throw new Error(
        "Unable to find version in definition: " +
          serviceVersion +
          "." +
          inputType._type +
          "_V" +
          inputType.version
      );
    }
  }

  return internalDefinition;
}

/*
 * TestService
 *
 * An awesome service
 */
import { AnotherTest, AnotherTest_V0, Test, Test_V0 } from "./types";

export type TestService = {
  V0: {
    AnotherTest_V0: (input: AnotherTest_V0) => Promise<Test_V0>;
  };
};
type TestServiceInternal = {
  V0: {
    AnotherTest_V0: (input: AnotherTest_V0) => Promise<Test_V0>;
  };
};
const TestServiceTypeMapping = {
  V0: {
    AnotherTest_V0: [
      [AnotherTest, Test],
      [AnotherTest_V0, Test_V0]
    ]
  }
};

export function TestServiceExpress(app: any, definition: TestService): void {
  // convert External definition
  const internalDefinition: TestServiceInternal = convertExternalDefinitionToInternal(
    definition,
    TestServiceTypeMapping
  );

  app.post(
    "/TestService",
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body;

      const serviceVersion = body["serviceVersion"];
      if (!serviceVersion) {
        throw new Error("Please provide service version");
      }
      // @ts-ignore
      const serviceVersionDefinition: any = internalDefinition[serviceVersion];
      if (!serviceVersionDefinition) {
        throw new Error("Unknown service version, please use the client.");
      }

      const inputType: any = body["inputType"];
      if (!inputType) {
        throw new Error("Please provide input type");
      }
      const inputVersion: any = body["inputVersion"];
      if (!inputVersion) {
        throw new Error("Please provide input version");
      }

      const serviceFunction: any =
        serviceVersionDefinition[inputType + "_V" + inputVersion];
      if (!serviceFunction) {
        throw new Error(
          "Unable to locate input type: " + inputType + "_V" + inputVersion
        );
      }

      const mappingTableVersion: any =
        // @ts-ignore
        TestServiceTypeMapping[serviceVersion];
      if (!mappingTableVersion) {
        throw new Error("Invalid service version");
      }

      const mappingClasses: any =
        mappingTableVersion[inputType + "_V" + inputVersion];
      if (!mappingClasses) {
        throw new Error("Invalid input type or version");
      }

      const [[inputTypeClass, outputTypeClass], _] = mappingClasses;

      const inputMessage = inputTypeClass.deserialize(body.data);
      const response = await serviceFunction(inputMessage);
      const outputMessage = outputTypeClass.serialize(response);
      res.json(outputMessage);
      return;
    })
  );
}
