import assert from 'assert';
import { it } from 'mocha';
import { Application, App, Customer, Service } from '../src';
import 'reflect-metadata';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './helloworld.proto');

const app: Application = new Application(PROTO_PATH);

@Service({ name: 'test', serviceName: 'testService' })
class ServiceClass {
    constructor(@Customer({ test: 'objectttt' }) prop: any, @App() app: any) {}
}

@Service({ name: 'test111', serviceName: 'testService' })
class ServiceTempClass {
    constructor(
        @App() app: any,
        @Customer({ test111: 'objectttt' }) prop: any
    ) {}
}

@Service({ name: 'test11', serviceName: 'testService' })
class ServiceTemp1Class {
    constructor(@App() app: any) {}
}

app.register(ServiceClass);
let ks = Reflect.getMetadataKeys(ServiceClass.prototype);
app.register(ServiceTempClass);
let ks1 = Reflect.getMetadataKeys(ServiceTempClass.prototype);
app.register(ServiceTemp1Class);
let ks2 = Reflect.getMetadataKeys(ServiceTemp1Class.prototype);

let services = app.services;
describe('Mikudos ts application tests', () => {
    it('app implement', () => {
        assert.ok(app instanceof Application);
    });

    it('params are set properly', () => {
        let len = Object.keys(services).filter(value =>
            ['test', 'test111', 'test11'].includes(value)
        ).length;
        assert.ok(
            Object.keys(services).filter(value =>
                ['test', 'test111', 'test11'].includes(value)
            ).length === 3
        );
    });

    it('params sequence are properly', () => {
        ks.forEach(key => {
            let data = Reflect.getMetadata(key, ServiceClass.prototype);
            if (key == 'App') assert.ok(data.index == 1);
            else assert.ok(data.param.test);
        });
        ks1.forEach(key => {
            let data = Reflect.getMetadata(key, ServiceTempClass.prototype);
            if (key == 'App') assert.ok(data.index == 0);
            else assert.ok(data.param.test111);
        });
        ks2.forEach(key => {
            let data = Reflect.getMetadata(key, ServiceTemp1Class.prototype);
            if (key == 'App') assert.ok(data.index == 0);
            else assert.ok(false);
        });
    });
});
