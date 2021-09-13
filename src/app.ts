import "reflect-metadata";
import envVars, {EnvVars, isDev} from "./utils/environment";
import express, {Application} from "express";
import {useExpressServer} from "routing-controllers";
import {HealthController} from "./health/health.controller";
import cors from "cors"
import helmet from "helmet";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {LoggerOptions} from "express-winston";
import {Logger} from "./utils/logger";

export class App {
    app: Application
    env: EnvVars
    constructor(env: EnvVars = envVars) {
        this.env = env
        this.app = express()
        this.configureMiddlewares()
        this.configureLogger()
        this.configureRouter()
    }

    configureMiddlewares() {
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(express.json())
    }

    configureLogger(){
        const loggerOptions: LoggerOptions = {
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.json(),
                winston.format.prettyPrint()
            ),
            meta: isDev()
        }
        this.app.use(expressWinston.logger(loggerOptions))
    }

    configureRouter() {
        useExpressServer(this.app,{
            controllers: [HealthController],
            routePrefix: this.env.PREFIX
        })
    }

    run() {
        Logger.info(`Application running on http://localhost:${this.env.PORT}${this.env.PREFIX}`);
        return this.app.listen(this.env.PORT)
    }
}

new App().run()
