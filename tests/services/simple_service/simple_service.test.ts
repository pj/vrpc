import supertest from 'supertest';
import express from 'express';
import * as request from "request-promise-native";

import {AnotherTest, Test, AnotherTest_V0, Test_V0} from './generated/types';
import * as services from './generated/services';
import * as client from './generated/client';

jest.mock('request-promise-native');

it('Should send and receive properly', async () => {
    process.env.VRPC_SERVICE_HOST = '';
    const app = express();
    app.use(express.json());
    services.TestServiceExpress(app, {
        V0: {
            "AnotherTest_V0": async (
                input: AnotherTest_V0
            ): Promise<Test_V0> => {
                return new Test_V0("hello: " + input.another_field, input.yet_another_field + 1);
            }
        }
    })
    // @ts-ignore
    request.post.mockImplementation(async (options: any) => {
        return supertest(app)
            .post(options.url)
            .send(options.body)
            .set('Accept', 'application/json')
            .then((response: any) => {
                return response;
            }).catch((error: any) => {
                console.dir(error)
            });
    });

    const response = await client.TestService.V0.AnotherTest_V0(true, 1111);
    expect(response.field1).toBe("hello: true");
    expect(response.field2).toBe(1112);
});