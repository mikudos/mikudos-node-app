import Mali from 'mali';
import config from 'config';

export class Application extends Mali {
    public config: any;
    public configure: Function;
    public context: any;
    constructor(
        path: any,
        name?: string | ReadonlyArray<string>,
        options?: any
    ) {
        super(path, name, options);
        this.config = config;
        this.configure = function(middle: Function): void {
            middle(this);
        };
    }
}
