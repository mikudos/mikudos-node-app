import { INVALID_SERVICE_CONFIG_MESSAGE } from './constants';

export class InvalidServiceConfigException extends Error {
    constructor(property: string) {
        super(INVALID_SERVICE_CONFIG_MESSAGE`${property}`);
    }
}
