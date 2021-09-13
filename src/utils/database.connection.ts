import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Logger} from "./logger";
import {getTypeOrmOptions} from "./typeorm.config";

export class DatabaseConnection {
    public static connection: Connection;

    public static async getInstance(options: ConnectionOptions = getTypeOrmOptions()): Promise<Connection> {
        if (!DatabaseConnection.connection) {
            Logger.info(`Database connection not found. Connecting now.`);
            DatabaseConnection.connection = await createConnection(options);
        }
        Logger.info(`Returning database connection.`);
        return DatabaseConnection.connection;
    }

    public static async disconnect() {
        if (DatabaseConnection.connection) {
            await DatabaseConnection.connection.close();
        }
    }

    public static async healthCheck() {
        Logger.debug(`Checking database health.`);
        const conn = await DatabaseConnection.getInstance();
        const result = await conn.manager.query("SELECT 1+1 as check");
        return Array.isArray(result) && result[0] && result[0].check === 2;
    }

}
