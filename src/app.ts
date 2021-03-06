import _ from 'lodash';
import Mali from 'mali';
import config from 'config';
import Debug from 'debug';
const debug = Debug('mikudos:app');

export declare namespace mikudos {
    interface ConfigFunc {
        (app: Application): void;
    }
}

export class Application extends Mali {
    public settings: any;
    public context: any;
    public services: { [key: string]: any } = {};
    constructor(
        path: any,
        name?: string | ReadonlyArray<string>,
        options?: any
    ) {
        super(path, name, options);
        this.settings = _.merge({}, config);
        debug('booting mikudos app');
    }

    get(name: string) {
        return _.get(this.settings, name);
    }

    set(name: string, value: any) {
        _.set(this.settings, name, value);
        return this;
    }

    disable(name: string) {
        _.set(this.settings, name, false);
        return this;
    }

    disabled(name: string) {
        return !_.get(this.settings, name);
    }

    enable(name: string) {
        _.set(this.settings, name, true);
        return this;
    }

    enabled(name: string) {
        return !!_.get(this.settings, name);
    }

    configure(fn: mikudos.ConfigFunc): Application {
        fn.call(this, this);

        return this;
    }

    register(serviceClass: any) {
        const pack = Reflect.getMetadata('package', serviceClass);
        const name = Reflect.getMetadata('name', serviceClass);
        let serviceName = Reflect.getMetadata('serviceName', serviceClass);
        serviceName = serviceName || name;
        const serviceBefores = Reflect.getMetadata('before', serviceClass);
        const serviceAfters = Reflect.getMetadata('after', serviceClass);
        if (serviceBefores) {
            this.use(
                `${pack ? pack + '.' : ''}${serviceName}`,
                ...serviceBefores
            );
        }
        const service = new serviceClass(
            ...this.retriveParamsForService(serviceClass)
        );
        this.services[name] = service;
        let properties = Object.getOwnPropertyNames(
            Object.getPrototypeOf(service)
        );
        for (const key of properties) {
            const method = service[key];
            if (!Reflect.hasMetadata('method', method)) continue;
            let param = Reflect.getMetadata('method', method);
            let befores = Reflect.getMetadata('before', method);
            let afters = Reflect.getMetadata('after', method);
            let methodList = param.methodList;
            methodList.forEach((methodName: string) => {
                let keyArr = (methodName as string).split('.');
                if (keyArr.length === 1) {
                    pack && (serviceName = `${pack}.${serviceName}`);
                    serviceName && keyArr.unshift(serviceName);
                } else {
                    let methName = keyArr.pop();
                    keyArr = [keyArr.join('.'), methName as string];
                }

                debug(
                    'register method: %o.%o with %o before hooks %o after hooks and %o serviceAfter hooks',
                    name,
                    key,
                    (befores || []).length,
                    (afters || []).length,
                    (serviceAfters || []).length
                );
                this.use(
                    ...keyArr,
                    ...(befores || []),
                    async (ctx: any, next: Function) =>
                        await service[key](ctx, next),
                    ...(afters || []),
                    ...(serviceAfters || [])
                );
            });
        }
    }

    private retriveParamsForService(serviceClass: any): any[] {
        let params: any[] = [];
        let keys = Reflect.getMetadataKeys(serviceClass.prototype);
        for (const value of keys) {
            const metadata = Reflect.getMetadata(value, serviceClass.prototype);
            const { index, param } = metadata;
            if (value == 'App') params[index] = this;
            else params[index] = param;
        }
        return params;
    }
}
