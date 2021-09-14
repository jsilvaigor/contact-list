import cors from "cors";
import express, {Application} from "express";
import * as expressWinston from "express-winston";
import {LoggerOptions} from "express-winston";
import helmet from "helmet";
import "reflect-metadata";
import {useExpressServer} from "routing-controllers";
import * as winston from "winston";
import {RegisterController} from "./auth/register/register.controller";
import {HealthController} from "./health/health.controller";
import {DatabaseConnection} from "./utils/database.connection";
import envVars, {EnvVars, isDev, isTest} from "./utils/environment";
import {Logger} from "./utils/logger";
import {RequestidMiddleware} from "./utils/requestid.middleware";
import {LoginController} from "./auth/login/login.controller";
import {currentUserChecker} from "./utils/auth.utils";
import {ContactsController} from "./contacts/contacts.controller";

export class App {
    private readonly app: Application;
    private env: EnvVars;
    constructor(env: EnvVars = envVars) {
        this.env = env;
        this.app = express();
        this.configureMiddlewares();
        this.configureLogger();
        this.configureRouter();
    }

    public run() {
        Logger.log(`Application running on http://localhost:${this.env.PORT}${this.env.PREFIX}`);
        return this.app.listen(this.env.PORT);
    }

    public getApp() {
        return this.app;
    }

    private configureMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
    }

    private configureLogger() {
        const loggerOptions: LoggerOptions = {
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.json(),
            ),
            meta: isDev(),
        };
        if (!isTest()) {
            this.app.use(expressWinston.logger(loggerOptions));
        }

    }

    private configureRouter() {
        useExpressServer(this.app, {
            controllers: [HealthController, RegisterController, LoginController, ContactsController],
            routePrefix: this.env.PREFIX,
            middlewares: [RequestidMiddleware],
            currentUserChecker,
        });
    }

}

if (!isTest()) {
    new App().run();
}
