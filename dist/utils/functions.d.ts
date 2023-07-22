export declare const groupObjectsByProp: <T extends Record<string, any>>(array: T[], prop: keyof T) => T[][];
export declare const capitaliseFirstCharacter: (stringValue: string) => string;
export declare const capitaliseString: (stringValue: string) => string;
export declare const callAll: <T extends (...args: any[]) => void>(...fns: T[]) => (...args: Parameters<T>) => void;
