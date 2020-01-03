import { INVALID_HOOK_CONFIG_MESSAGE } from './constants';

export class InvalidHookConfigException extends Error {
    constructor(property: string) {
        super(INVALID_HOOK_CONFIG_MESSAGE`${property}`);
    }
}
