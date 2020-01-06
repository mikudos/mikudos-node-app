export class Service {
    package?: string;
    constructor(
        public handlers: any,
        public methodMap: any,
        public service: string,
        packageName?: string
    ) {
        this.package = packageName;
    }
}
