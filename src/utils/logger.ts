import {object} from "joi";
import envVars, {isTest} from "./environment";

export type LogLevel = "debug" | "info" | "warn" | "error" | "all"

export enum LogLevelEnum {
    error,
    warn,
    info,
    debug,
    all
}

export class Logger {

    static log(message: string | object, requestId: string ="", level: LogLevel = "all") {
        if(!isTest()){
            if (LogLevelEnum[level] <= LogLevelEnum[envVars.LOG_LEVEL] || level === "all") {
                const toLog: string = message instanceof object ? JSON.stringify(message) : message as string
                console.log(JSON.stringify({level, message: toLog, requestId, timestamp: new Date().toISOString()}))
            }
        }


    }

    static debug(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "debug")
    }

    static info(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "info")
    }

    static warn(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "warn")
    }

    static error(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "error")
    }


}
