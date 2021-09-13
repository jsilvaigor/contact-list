import {object} from "joi";
import envVars from "./environment";

export type LogLevel = "debug" | "info" | "warn" | "error" | "all"

export enum LogLevelEnum {
    error,
    warn,
    info,
    debug,
    all
}

export class Logger {

    static log(message: string | object, level: LogLevel = "all") {
        if(LogLevelEnum[level] <= LogLevelEnum[envVars.LOG_LEVEL] || level === "all"){
            const toLog: string = message instanceof object ? JSON.stringify(message) : message as  string
            console.log(JSON.stringify({level, message: toLog, timestamp: new Date().toISOString()}))
        }

    }

    static debug(message: string | object){
        Logger.log(message, "debug")
    }

    static info(message: string | object) {
        Logger.log(message, "info")
    }

    static warn(message: string | object) {
        Logger.log(message, "warn")
    }

    static error(message: string | object) {
        Logger.log(message, "error")
    }


}
