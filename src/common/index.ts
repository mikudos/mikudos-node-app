export * from './service.decorator';
export * from './method.decorator';
export * from './method.hook.decorator';
export * from './service.hook.decorator';

export * from './params';

import { Service } from './service.decorator';
import { Method } from './method.decorator';
import { HookMethod } from './method.hook.decorator';
import { HookService } from './service.hook.decorator';
const requiredMetadataKey = Symbol('required');
import 'reflect-metadata';

import { App } from './params';

@Service({ name: 'test', serviceName: 'testService' })
class Test {
    constructor(@App() test: any) {
        console.log('test property:', test);
    }
}

// console.log('TCL: Test', Test.constructor.arguments);
let len = Reflect.getMetadataKeys(Test);
console.log('TCL: len', len);
let test = Reflect.getMetadata('param_app', Test);
let params = [];
if (typeof test == 'number') {
    console.log('TCL: App', test);
    params[0] = { aaa: 'bbbb' };
}
// let t = new Test(...params);
// console.log('TCL: t', t.constructor.arguments);
