import { Service } from './service.decorator';
import { Method } from './method.decorator';
import { METHOD_METADATA } from './constants';
import 'reflect-metadata';

@Service({ name: 'teste11' })
class Test {
    constructor() {}

    @Method('test')
    test111() {
        console.log('111');
    }
    test222() {}
}

let t = new Test();

let res = Reflect.hasMetadata('method', t.test222);
console.log('TCL: res', res);
let metadata = Reflect.getMetadata('method', t.test111);
console.log('TCL: metadata', metadata);
