import {object} from "joi";

export type LogLevel = "debug" | "info" | "warn" | "error"

export class Logger {

    static log(message: string | object, level: LogLevel = "debug") {
        const toLog: string = message instanceof object ? JSON.stringify(message) : message as  string
        console.log(JSON.stringify({level, message: toLog, timestamp: new Date().toISOString()}))
    }

    static info(message: string | object) {
        Logger.log(message, "info")
    }


}
