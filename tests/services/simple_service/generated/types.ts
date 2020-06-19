/**
 * **GENERATED CODE DO NOT EDIT!**
 */
/*
 * Test
 * A type to test with
 * Change Log:
 * 0. TODO add changelog
 * 1. This is a good field to add
 * 2. This is a good field to add
 */
/**
 * @param field1 A cool field
 * @param field2 Another cool field
 *
 * @sealed
 */
class Test_V0 {
  readonly _type: string;
  readonly version: number;
  readonly hash: string;
  readonly field1: string;
  readonly field2: number;

  constructor(field1: string, field2: number) {
    this._type = "Test";
    this.version = 0;
    this.hash =
      "325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508";
    this.field1 = field1;
    this.field2 = field2;
  }

  static deserialize(message: any): Test_V0 {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return new Test_V0(message.field1, message.field2);
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
        return new Test_V0(message.field1, message.field2);

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
 * @param another_field this is a field
 * @param yet_another_field asdf
 *
 * @sealed
 */
class AnotherTest_V0 {
  readonly _type: string;
  readonly version: number;
  readonly hash: string;
  readonly another_field: boolean;
  readonly yet_another_field: number;

  constructor(another_field: boolean, yet_another_field: number) {
    this._type = "AnotherTest";
    this.version = 0;
    this.hash =
      "325c6bda9b2b4f6608eb2604a775f368ee15220bed390a475950a9db3d426508";
    this.another_field = another_field;
    this.yet_another_field = yet_another_field;
  }

  static deserialize(message: any): AnotherTest_V0 {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return new AnotherTest_V0(message.another_field, message.yet_another_field);
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
        return new AnotherTest_V0(
          message.another_field,
          message.yet_another_field
        );

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
