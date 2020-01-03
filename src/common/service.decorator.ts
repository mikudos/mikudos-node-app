import { InvalidServiceConfigException } from './exceptions/invalid-service-config.exception';

const metadataKeys = ['name', 'package'];
interface MetaData {
    name: string;
    serviceName?: string;
    package?: string;
}

const validateKeys = (keys: string[]) => {
    const validateKey = (key: string) => {
        if (metadataKeys.includes(key)) {
            return;
        }
        throw new InvalidServiceConfigException(key);
    };
    keys.forEach(validateKey);
};

export function Service(metadata: MetaData): ClassDecorator {
    const propsKeys = Object.keys(metadata);
    validateKeys(propsKeys);

    return (target: object) => {
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(
                    property,
                    (metadata as any)[property],
                    target
                );
            }
        }
    };
}
