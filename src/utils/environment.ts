import * as dotenv from "dotenv"
import * as Joi from "joi";

dotenv.config()

export interface EnvVars {
    NODE_ENV: string;
    LOG_LEVEL: string;
    PORT: number;
}

export function configureEnvironmentVars(environment: Record<string, unknown>): EnvVars {
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('debug'),
        PORT: Joi.number().default(3000),
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
