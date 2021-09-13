import envVars, {EnvVars} from "./environment";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {getTypeOrmOptions} from "./typeorm.config";
import {Logger} from "./logger";

export class DatabaseConnection {
    private static connection: Connection
    constructor(){}

    static async getInstance(options: ConnectionOptions = getTypeOrmOptions()): Promise<Connection> {
        if(!DatabaseConnection.connection){
            Logger.info(`Database connection not found. Connecting now.`)
            DatabaseConnection.connection = await createConnection(options)
        }
        Logger.info(`Returning database connection.`)
        return DatabaseConnection.connection
    }

    static async healthCheck() {
        Logger.debug(`Checking database health.`)
        const conn = await DatabaseConnection.getInstance()
        const result = await conn.manager.query("SELECT 1+1 as check")
        return Array.isArray(result) && result[0] && result[0].check === 2
    }

}
