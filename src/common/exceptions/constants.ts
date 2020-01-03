export const INVALID_SERVICE_CONFIG_MESSAGE = (
    text: TemplateStringsArray,
    property: string
) => `Invalid property '${property}' in the @Module() decorator.`;

export const INVALID_HOOK_CONFIG_MESSAGE = (
    text: TemplateStringsArray,
    property: string
) => `Invalid hook type '${property}' in the @HOOK() decorator.`;
