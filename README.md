![Mikudos Service](https://img.shields.io/badge/MIKUDOS-GRPC--server-lightgrey?style=for-the-badge&logo=appveyor)

# [![Mikudos](https://raw.githubusercontent.com/mikudos/doc/master/mikudos-logo.png)](https://mikudos.github.io/doc)

# mikudos-node-app

mikudos-node-app is one Building block of Mikudos

![node version](https://img.shields.io/node/v/mikudos-node-app) ![version](https://img.shields.io/github/package-json/v/mikudos/mikudos-node-app) [![npm version](https://img.shields.io/npm/v/mikudos-node-app)](https://www.npmjs.com/package/mikudos-node-app) ![license](https://img.shields.io/npm/l/mikudos-node-app) ![downloads](https://img.shields.io/npm/dw/mikudos-node-app) ![collaborators](https://img.shields.io/npm/collaborators/mikudos-node-app) ![typescript](https://img.shields.io/npm/types/mikudos-node-app)

### build on top of [Mali.js](https://mali.js.org/)

The Application self is extended from Mali's Application

## Usage

Import the mikudos-socketio-server module:

```ts
import { Application } from 'mikudos-node-app';

const PROTO_PATH = path.resolve(
    __dirname,
    '../proto/game_puzzles/game_puzzles.proto'
);

const app: Application = new Application(PROTO_PATH);
```

```js
var { Application } = require('mikudos-node-app');

const PROTO_PATH = path.resolve(
    __dirname,
    '../proto/game_puzzles/game_puzzles.proto'
);

const app: Application = new Application(PROTO_PATH);
```

# License

[MIT](LICENSE)
