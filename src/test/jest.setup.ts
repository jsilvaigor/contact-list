import {DatabaseConnection} from "../utils/database.connection";

afterAll(() => DatabaseConnection.disconnect());
