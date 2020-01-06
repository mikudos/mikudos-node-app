import { METHOD_METADATA } from '../constants';
import { InvalidServiceConfigException } from '../exceptions/invalid-service-config.exception';
import { Application } from '../../app';

const metadataKeys = [METHOD_METADATA];

// export function App(
//     target: Object,
//     propertyKey: string | symbol,
//     parameterIndex: number
// ) {
//     console.log('TCL: App -> target', target);
//     console.log('TCL: App -> propertyKey', propertyKey);
//     console.log('TCL: App -> parameterIndex', parameterIndex);
//     Reflect.defineMetadata('App', parameterIndex, target, propertyKey);
// }

export function App(): ParameterDecorator;

export function App() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        console.log('TCL: App -> target', target);
        console.log('TCL: App -> propertyKey', propertyKey);
        console.log('TCL: App -> parameterIndex', parameterIndex);
        Reflect.defineMetadata(
            'param_app',
            parameterIndex,
            target,
            propertyKey
        );
    };
}
