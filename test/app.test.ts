import { Application } from '../src';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './helloworld.proto');

const app: Application = new Application(PROTO_PATH);
app.start(`127.0.0.1:50051`);
