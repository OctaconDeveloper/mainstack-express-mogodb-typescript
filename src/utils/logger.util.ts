import { ILogger } from "app/contracts/logger.contract";
import { APP_NAME } from "./config.utils";

export class Logger implements ILogger {
    debug(message: string, optionalData?: any): void {
        this.logFormatter("debug", message, optionalData)
    }
    warn(message: string, optionalData?: any): void { 
        this.logFormatter("warn", message, optionalData)
    }
    error(message: string, optionalData?: any): void {
        this.logFormatter("error", message, optionalData)
     }
    info(message: string, optionalData?: any): void {
        this.logFormatter("info", message, optionalData)
     }



    private logFormatter(level: "debug"|"info"|"error"|"warn", msg: string, optionalData?: any): void {
        const data = `[${APP_NAME}] - ${(new Date()).toLocaleDateString()}, ${(new Date()).toLocaleTimeString()} LOG[${level.toUpperCase()}] ${msg}`
        if(optionalData && optionalData.length > 0)
        {
            console[level](data, optionalData)
        }else{
            console[level](data)
        }
    }
}