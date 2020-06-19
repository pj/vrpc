import {AnotherTest, Test, AnotherTest_V0, Test_V0} from './generated/types';
import * as services from './generated/services';
import * as client from './generated/client';


it('Should send and receive properly', async () => {
    new Test_V0('asdf', 1234);
});