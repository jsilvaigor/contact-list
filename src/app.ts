import "reflect-metadata";
import envVars, {EnvVars, isDev, isTest} from "./utils/environment";
import express, {Application} from "express";
import {useExpressServer} from "routing-controllers";
import {HealthController} from "./health/health.controller";
import cors from "cors"
import helmet from "helmet";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {LoggerOptions} from "express-winston";
import {Logger} from "./utils/logger";
import {RegisterController} from "./auth/register/register.controller";
import {RequestidMiddleware} from "./utils/requestid.middleware";
import {DatabaseConnection} from "./utils/database.connection";

export class App {
    private readonly app: Application
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
        if(!isTest()){
            this.app.use(expressWinston.logger(loggerOptions))
        }

    }

    configureRouter() {
        useExpressServer(this.app,{
            controllers: [HealthController, RegisterController],
            routePrefix: this.env.PREFIX,
            middlewares: [RequestidMiddleware]
        })
    }

    run() {
        Logger.log(`Application running on http://localhost:${this.env.PORT}${this.env.PREFIX}`);
        return this.app.listen(this.env.PORT)
    }

    getApp() {
        return this.app
    }
}

if(!isTest()){
    new App().run()
}

