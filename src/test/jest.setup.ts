import {DatabaseConnection} from "../utils/database.connection";
import {App} from "../app";

export const app = new App().getApp();

afterAll(() => DatabaseConnection.disconnect());
