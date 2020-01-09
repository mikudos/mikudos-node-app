import { Application, App, Customer, Service } from '../src';
import 'reflect-metadata';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './helloworld.proto');

const app: Application = new Application(PROTO_PATH);

@Service({ name: 'test', serviceName: 'testService' })
class Test {
    constructor(@Customer({ test: 'objectttt' }) prop: any, @App() app: any) {}
}

// console.log('TCL: Test', Test.constructor.arguments);
let len = Reflect.getMetadataKeys(Test);
let keys = Reflect.getMetadataKeys(Test.constructor, 'index');
let customerIndex = Reflect.getMetadata(
    'Customer_0',
    Test.constructor,
    'index'
);
let appIndex = Reflect.getMetadata('App', Test.constructor, 'index');
let params = [];
for (const value of keys) {
    let index = Reflect.getMetadata(value, Test.constructor, 'index');
    console.log('TCL: index', value, index);
    if (value == 'App') params[index] = app;
    else
        params[index] = Reflect.getMetadata(
            value,
            Test.constructor,
            'property'
        );
}
let t = new (Test as any)(...params);
// console.log('TCL: t', t.constructor.arguments);
