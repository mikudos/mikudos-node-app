import Application from '..';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './helloworld.proto');

const app: Application = new Application(PROTO_PATH);
app.start(`0.0.0.0:50051`);
