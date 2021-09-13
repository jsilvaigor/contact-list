import {ConnectionOptions} from "typeorm";
import {UserModel} from "../auth/register/user.model";
import envVars, {EnvVars} from "./environment";

export function getTypeOrmOptions(env: EnvVars = envVars): ConnectionOptions {
    const ssl = env.NODE_ENV === "production" ? {rejectUnauthorized: false} : undefined;
    return {
        type: "postgres",
        url: env.DATABASE_URL,
        entities: [UserModel],
        schema: "contact_list",
        synchronize: false,
        ssl,
    };
}
