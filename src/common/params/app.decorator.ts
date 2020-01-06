import { METHOD_METADATA } from '../constants';
import { createParamDecorator } from './params.common';

export function App(): ParameterDecorator;

export function App() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        createParamDecorator('App', parameterIndex, target);
    };
}
