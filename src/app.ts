import _ from 'lodash';
import Mali from 'mali';
import config from 'config';
import { concat, get } from 'lodash';

export declare namespace mikudos {
    interface ConfigFunc {
        (app: Application): void;
    }
}

export class Application extends Mali {
    public config: any;
    public settings: any;
    public context: any;
    public services: { [key: string]: any } = {};
    constructor(
        path: any,
        name?: string | ReadonlyArray<string>,
        options?: any
    ) {
        super(path, name, options);
        this.config = config;
        this.settings = _.merge({}, config);
    }

    get(name: string) {
        return this.settings[name];
    }

    set(name: string, value: any) {
        this.settings[name] = value;
        return this;
    }

    disable(name: string) {
        this.settings[name] = false;
        return this;
    }

    disabled(name: string) {
        return !this.settings[name];
    }

    enable(name: string) {
        this.settings[name] = true;
        return this;
    }

    enabled(name: string) {
        return !!this.settings[name];
    }

    configure(fn: mikudos.ConfigFunc): Application {
        fn.call(this, this);

        return this;
    }

    register(serviceClass: any) {
        const pack = Reflect.getMetadata('package', serviceClass);
        const name = Reflect.getMetadata('name', serviceClass);
        const serviceBefores = Reflect.getMetadata('before', serviceClass);
        const serviceAfters = Reflect.getMetadata('after', serviceClass);
        if (serviceBefores) {
            this.use(`${pack}.${name}`, ...serviceBefores);
        }
        const service = new serviceClass();
        this.services[name] = service;
        for (const key in service) {
            if (service.hasOwnProperty(key)) {
                const method = service[key];
                if (!Reflect.hasMetadata('method', method)) continue;
                let param = Reflect.getMetadata('method', method);
                let befores = Reflect.getMetadata('before', method);
                let afters = Reflect.getMetadata('after', method);
                let methodList = param.methodList;
                methodList.forEach((methodName: string) => {
                    let keyArr = (methodName as string).split('.');
                    if (keyArr.length === 1) {
                        name && keyArr.unshift(name);
                        pack && keyArr.unshift(pack);
                    }

                    this.use(
                        ...keyArr,
                        ...(befores || []),
                        async (ctx: any) => await method(ctx),
                        ...(afters || []),
                        ...(serviceAfters || [])
                    );
                });
            }
        }
    }
}
