![Mikudos Service](https://img.shields.io/badge/MIKUDOS-GRPC--server-lightgrey?style=for-the-badge&logo=appveyor)

# [![Mikudos](https://raw.githubusercontent.com/mikudos/doc/master/mikudos-logo.png)](https://mikudos.github.io/doc)

# mikudos-node-app

mikudos-node-app is one Building block of Mikudos

![node version](https://img.shields.io/node/v/mikudos-node-app) ![version](https://img.shields.io/github/package-json/v/mikudos/mikudos-node-app) [![npm version](https://img.shields.io/npm/v/mikudos-node-app)](https://www.npmjs.com/package/mikudos-node-app) ![license](https://img.shields.io/npm/l/mikudos-node-app) ![downloads](https://img.shields.io/npm/dw/mikudos-node-app) ![collaborators](https://img.shields.io/npm/collaborators/mikudos-node-app) ![typescript](https://img.shields.io/npm/types/mikudos-node-app)

### build on top of [Mali.js](https://mali.js.org/)

The Application self is extended from Mali's Application

## Example

[A Example implementation of mikudos-node-app in typescript can be found as the linked repository.](https://github.com/mikudos/mikudos-service-ts)

## Usage

Import the mikudos-node-app module:

```ts
import { Application } from 'mikudos-node-app';

const PROTO_PATH = path.resolve(
    __dirname,
    '../proto/game_puzzles/game_puzzles.proto'
);

const app: Application = new Application(PROTO_PATH);

// write a service to handle grpc methods
import {
    Service,
    Method,
    HookMethod,
    HookService,
    App,
    Customer
} from 'mikudos-node-app';
import { hook1, hook2 } from './greeter_service.hooks';
/**
 * You can find a systematic description for the use case of middleware at: https://mali.js.org/api/#mali-%E2%87%90-emitter
 **/
async function hook1(ctx: any, next: Function) {
    // TransactionManager.commitTransaction
    console.log('GreeterService service hook');
    await next();
}

@Service({ name: 'GreeterService', serviceName: 'GreeterService' }) // register the service with name to add the service to app.services[name] at the same time
@HookService('before', hook1) // add one service level before hook
@HookService('after', hook1) // add one service level after hook
export class Greeter {
    constructor(
        @App() private app: Application,
        @Customer('test string') private test: any
    ) {}

    @Method('SayHello') // register method to a grpc method
    @Method('SayHi') // register the same method to an other grpc method
    @HookMethod('before', hook2) // register a method level middleware as before hook
    @HookMethod('before', hook2) // register an other method level middleware as before hook
    @HookMethod('after', hook2) // register a method level middleware as after hook
    async SayHello(ctx: any) {
        // the handle method self
        const app = ctx.app;
        ctx.res = { message: 'Hello '.concat(ctx.req.name) };
    }
}

app.register(Greeter);
```

```js
// for js implementation should use the version 1.0.16 of mikudos-node-app
var { Application } = require('mikudos-node-app');

const PROTO_PATH = path.resolve(
    __dirname,
    '../proto/game_puzzles/game_puzzles.proto'
);

const app: Application = new Application(PROTO_PATH);
```

# License

[MIT](LICENSE)
