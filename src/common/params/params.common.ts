export function createParamDecorator(
    name: string,
    index: number,
    target: Object,
    param?: any
) {
    Reflect.defineMetadata(name, index, target.constructor, 'index');
    param &&
        Reflect.defineMetadata(name, param, target.constructor, 'property');
}
