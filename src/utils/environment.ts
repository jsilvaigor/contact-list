import * as dotenv from "dotenv"
import * as Joi from "joi";
import {LogLevel} from "./logger";

dotenv.config()

export interface EnvVars {
    NODE_ENV: string;
    LOG_LEVEL: LogLevel;
    PORT: number;
    PREFIX: string;
}

export function configureEnvironmentVars(environment: Record<string, unknown>): EnvVars {
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('debug'),
        PORT: Joi.number().default(3000),
        PREFIX: Joi.string().default("/api/v1")
    });

    const { error, value: vars } = schema.validate(environment, {
        stripUnknown: true,
    });
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return vars;
}

let envVars: EnvVars;

try {
    envVars = configureEnvironmentVars(process.env);
} catch (e) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
        console.error(e);
        /* istanbul ignore next */
        process.exit(1);
    }
}
export default envVars;


export function isDev(){
    return envVars.NODE_ENV === "development"
}
