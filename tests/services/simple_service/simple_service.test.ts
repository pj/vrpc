import {AnotherTest, Test, AnotherTest_V0, Test_V0} from './generated/types';
import * as services from './generated/services';
import * as client from './generated/client';


it('Should send and receive properly', async () => {
    const response = await client.TestService.V0.AnotherTest_V0(true, 1111);
});