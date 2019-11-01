import Mali from 'mali';

export default class MikudosApp extends Mali {
    public config: any;
    public settings: any;
    public context: any;
    constructor(
        path: any,
        name?: string | ReadonlyArray<string>,
        options?: any
    );
    get(name: string): any;
    set(name: string, value: any): MikudosApp;
    disable(name: string): MikudosApp;
    disabled(name: string): boolean;
    enable(name: string): MikudosApp;
    enabled(name: string): boolean;
    configure(fn: Function): MikudosApp;
}

export namespace mikudosApp {}
