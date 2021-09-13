import envVars, {EnvVars} from "./environment";
import {ConnectionOptions, TypeORMError} from "typeorm";

export function getTypeOrmOptions(env: EnvVars = envVars): ConnectionOptions {
    const ssl = envVars.NODE_ENV === "production" ? {rejectUnauthorized: false} : undefined
    return {
        type: "postgres",
        url: envVars.DATABASE_URL,
        entities: [],
        synchronize: false,
        ssl
    }
}
