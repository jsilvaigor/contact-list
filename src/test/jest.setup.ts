import {DatabaseConnection} from "../utils/database.connection";
import {App} from "../app";
import {FirebaseDatabase} from "../utils/firebase.database";
import envVars from "../utils/environment";

export const app = new App().getApp();

beforeAll( async () => {
    await FirebaseDatabase.getInstance(`test_${envVars.FIREBASE_REFERENCE}`);
});

afterAll(async () => {
    await DatabaseConnection.disconnect();
    const instance = await FirebaseDatabase.getInstance();
    await instance.remove();
    await FirebaseDatabase.database.app.delete();
});
