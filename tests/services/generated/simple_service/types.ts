/**
 * **GENERATED CODE DO NOT EDIT!**
 */
import { Request, Response } from "express";
/*
 * Test
 * A type to test with
 * Change Log:
 * 0. TODO add changelog
 * 1. This is a good field to add
 * 2. This is a good field to add
 */
/**
 * @param Test Another cool field
 *
 * @sealed
 */
class Test_V0 {
  readonly _type: string;
  readonly version: number;
  readonly hash: string;
  readonly Test: integer;

  constructor(Test: integer) {
    this._type = "Test";
    this.version = 0;
    this.hash =
      "325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508";
    this.Test = Test;
  }

  static deserialize(message: any): Test_V0 {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return new Test_V0(message.Test);
  }

  static serialize(message: Test_V0): string {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return JSON.stringify(message);
  }
}

export {
  Test_V0,
  Test_V0 as Test_H325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508
};

export class Test {
  static deserialize(message: any): Test_V0 {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    switch (message.version) {
      case "Test_V0":
      case "Test_H325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508":
        return new Test_V0(message.Test);

      default:
        throw new Error(
          "Unknown version error or version not present: " + message
        );
    }
  }

  static serialize(message: Test_V0): string {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return JSON.stringify(message);
  }
}

/*
 * AnotherTest
 * Another type of test
 * Change Log:
 * 0. TODO add changelog
 * 1. This is a good field to add
 * 2. This is a good field to add
 */
/**
 * @param AnotherTest asdf
 *
 * @sealed
 */
class AnotherTest_V0 {
  readonly _type: string;
  readonly version: number;
  readonly hash: string;
  readonly AnotherTest: float;

  constructor(AnotherTest: float) {
    this._type = "AnotherTest";
    this.version = 0;
    this.hash =
      "325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508";
    this.AnotherTest = AnotherTest;
  }

  static deserialize(message: any): AnotherTest_V0 {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return new AnotherTest_V0(message.AnotherTest);
  }

  static serialize(message: AnotherTest_V0): string {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return JSON.stringify(message);
  }
}

export {
  AnotherTest_V0,
  AnotherTest_V0 as AnotherTest_H325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508
};

export class AnotherTest {
  static deserialize(message: any): AnotherTest_V0 {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    switch (message.version) {
      case "AnotherTest_V0":
      case "AnotherTest_H325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508":
        return new AnotherTest_V0(message.AnotherTest);

      default:
        throw new Error(
          "Unknown version error or version not present: " + message
        );
    }
  }

  static serialize(message: AnotherTest_V0): string {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return JSON.stringify(message);
  }
}
