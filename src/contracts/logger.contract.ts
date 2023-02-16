export interface ILogger {
    debug(message: string, optionalData?: any): void;
    warn(message: string, optionalData?: any): void;
    error(message: string, optionalData?: any): void;
    info(message: string, optionalData?: any): void;
}