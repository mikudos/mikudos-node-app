import _ from 'lodash';
import Mali from 'mali';
import config from 'config';
import { concat, get } from 'lodash';
import { Service } from './service';

declare namespace mikudos {
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

    register(name: string, service: Service, hooks: any = {}) {
        this.services[name] = service;
        const methodMap = get(service, 'methodMap');
        for (const key in methodMap) {
            let keyArr = [key];
            service.service &&
                keyArr.unshift(
                    `${service.package ? service.package + '.' : ''}${
                        service.service
                    }`
                );
            this.use(
                ...keyArr,
                ...concat(
                    get(hooks, 'before.all', []),
                    get(hooks, `before.${key}`, [])
                ),
                async (ctx: any) => await service.handlers[methodMap[key]](ctx),
                ...concat(
                    get(hooks, 'after.all', []),
                    get(hooks, `after.${key}`, [])
                )
            );
        }
    }
}
export default mikudos;
