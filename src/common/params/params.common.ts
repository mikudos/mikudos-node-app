export function createParamDecorator(
    name: string,
    index: number,
    target: any,
    param?: any
) {
    Reflect.defineMetadata(name, { index, param }, target.prototype);
}
