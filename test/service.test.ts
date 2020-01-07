import { Application, App, Customer, Service } from '../src';
import 'reflect-metadata';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './helloworld.proto');

const app: Application = new Application(PROTO_PATH);

@Service({ name: 'test', serviceName: 'testService' })
class ServiceClass {
    constructor(@Customer({ test: 'objectttt' }) prop: any, @App() app: any) {
        console.log('TCL: ServiceClass -> constructor -> app', app);
        console.log('TCL: ServiceClass -> constructor -> prop', prop);
    }
}

app.register(ServiceClass);
