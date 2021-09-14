import * as dotenv from "dotenv";
import * as Joi from "joi";
import {LogLevel} from "./logger";

dotenv.config();

export interface EnvVars {
    NODE_ENV: string;
    LOG_LEVEL: LogLevel;
    PORT: number;
    PREFIX: string;
    DATABASE_URL: string;
    SALTS_OR_ROUNDS: number;
    JWT_SECRET: string;
    FIREBASE_SERVICE_ACCOUNT_KEY: string;
    FIREBASE_DATABASE_URL: string;
    FIREBASE_REFERENCE: string;
}

export function configureEnvironmentVars(environment: Record<string, unknown>): EnvVars {
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
        LOG_LEVEL: Joi.string().valid("debug", "info", "warn", "error").default("debug"),
        PORT: Joi.number().default(3000),
        PREFIX: Joi.string().default("/api/v1"),
        DATABASE_URL: Joi.string().required(),
        SALTS_OR_ROUNDS: Joi.number().default(10),
        JWT_SECRET: Joi.string().required(),
        FIREBASE_SERVICE_ACCOUNT_KEY: Joi.string().required(),
        FIREBASE_DATABASE_URL: Joi.string().uri().required(),
        FIREBASE_REFERENCE: Joi.string().default("address_book"),
    });

    const { error, value: vars } = schema.validate(environment, {
        stripUnknown: true,
    });
    if (error) {
        /* istanbul ignore next */
        throw new Error(`Config validation error: ${error.message}`);
    }

    return  {...vars, FIREBASE_SERVICE_ACCOUNT_KEY: JSON.parse(vars.FIREBASE_SERVICE_ACCOUNT_KEY)};
}

let envVars: EnvVars;

try {
    envVars = configureEnvironmentVars(process.env);
} catch (e) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "test") {
        console.error(e);
        /* istanbul ignore next */
        process.exit(1);
    }
}
export default envVars;

export function isDev() {
    return envVars.NODE_ENV === "development";
}

export function isTest() {
    return envVars.NODE_ENV === "test";
}
