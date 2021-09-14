/* istanbul ignore file */
import {object} from "joi";
import envVars, {isTest} from "./environment";

export type LogLevel = "debug" | "info" | "warn" | "error" | "all";

export enum LogLevelEnum {
    error,
    warn,
    info,
    debug,
    all,
}

export class Logger {

    public static log(message: string | object, requestId: string = "", level: LogLevel = "all") {
        if (!isTest()) {
            if (LogLevelEnum[level] <= LogLevelEnum[envVars.LOG_LEVEL] || level === "all") {
                const toLog: string = message instanceof object ? JSON.stringify(message) : message as string;
                // tslint:disable-next-line
                console.log(JSON.stringify({level, message: toLog, requestId, timestamp: new Date().toISOString()}));
            }
        }

    }

    public static debug(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "debug");
    }

    public static info(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "info");
    }

    public static warn(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "warn");
    }

    public static error(message: string | object, requestId: string = "") {
        Logger.log(message, requestId, "error");
    }

}
